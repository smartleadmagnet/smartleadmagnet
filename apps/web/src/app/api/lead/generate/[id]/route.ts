import { NextRequest, NextResponse } from "next/server";
import { validateLeadWithInput } from "@smartleadmagnet/llm";
import * as cheerio from "cheerio";
import axios from "axios";

import {
  createLeadMagnetUsageLog,
  getCredit,
  getLeadMagnetById,
  incrementCreditUsage,
  updateLeadMagnetUsage,
} from "@smartleadmagnet/services";

import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { getIPAddress } from "@/utils/ip";
import { triggerWebhook } from "@/utils/webhook";
import { convert } from "html-to-text";
import { sendEmail } from "@/lib/email";

let rateLimit: Ratelimit | undefined;

if (process.env.UPSTASH_REDIS_REST_URL) {
  rateLimit = new Ratelimit({
    redis: Redis.fromEnv(),
    limiter: Ratelimit.fixedWindow(5000, "1440 m"),
    analytics: true,
    prefix: "smartleadmagnet",
  });
}

export const dynamic = "force-dynamic";
export const maxDuration = 60;

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const identifier = getIPAddress();

    if (rateLimit && identifier) {
      const { success } = await rateLimit?.limit(identifier);
      if (!success) {
        return NextResponse.json({ error: "No requests left. Please try again in 24h." }, { status: 429 });
      }

      const lead = await getLeadMagnetById(params.id);
      const credit = await getCredit(lead.userId);
      // @ts-ignore
      let apiKey = lead?.apiKey?.apiKey;
      if (credit?.total > credit?.used) {
        apiKey = null;
      }

      if (process.env.NODE_ENV !== "development" && !apiKey && (!credit || credit?.total <= credit?.used)) {
        return NextResponse.json(
          { error: "No credits left. Buy extra credit or add your own API key " },
          { status: 402 }
        );
      }
      const payload = await req.json();
      // Check if the lead has any website components
      const websiteComponent = (lead?.components as Array<any>)?.find((item) => item.type === "website");
      if (websiteComponent) {
        // Check if the website URL is present in the payload
        if (payload[websiteComponent.name]) {
          try {
            // Fetch the website content using axios
            const response = await axios.get(payload[websiteComponent.name]);
            const htmlContent = response.data;

            // // Parse the HTML content using cheerio
            const $ = cheerio.load(htmlContent);

            const title = $("title").text();
            const description = $('meta[name="description"]').attr("content") || "";
            const bodyText = $("body").text().trim().replace(/\s+/g, " ").substring(0, 5000); // Limit to 5000 characters

            // Add the website content to the payload
            payload[websiteComponent.name] = {
              title,
              description,
              bodyText,
            };
          } catch (error) {
            // Absorb the error if the website is not accessible
            console.error("Error fetching website content:", error);
          }
        }

        // Pass the extracted data as promptInput to validateLeadWithInput
        const result = await validateLeadWithInput({ leadMagnet: lead, promptInput: payload, apiKey }); // Pass the HTML content as promptInput

        // Update the lead magnet usage (increment usedCount and update lastUsedAt)
        await updateLeadMagnetUsage(lead.id);

        // Increment the used credits count for the user
        if (credit) {
          await incrementCreditUsage(lead.userId);
        }

        let webhookStatus = "pending";
        let emailSent = false;

        if (lead.webhook) {
          const webhookResult = await triggerWebhook(lead.webhook, { leadId: lead.id, payload, ip: identifier });
          webhookStatus = webhookResult.success ? "success" : "failed";
        }

        // ts-ignore
        const emailComponent = (lead?.components as Array<any>)?.find((item) => item.type === "email");
        if (lead.emailSubject && lead.emailContent && emailComponent) {
          try {
            const emailHtml = lead.emailContent;
            const emailText = convert(emailHtml);
            await sendEmail(payload[emailComponent.name], lead.emailSubject, emailText, emailHtml);
            console.log("Email sent successfully");
            emailSent = true;
          } catch (e: any) {
            // TODO sentry error
            console.log("Email sending failed", e.message);
          }
        }

        await createLeadMagnetUsageLog({
          leadMagnetId: lead.id,
          ipAddress: identifier,
          payload: payload,
          webhookStatus,
          emailSent,
        });

        return NextResponse.json({ message: result });
      } else {
        return NextResponse.json({ error: "Lead magnet does not have a website component." }, { status: 400 });
      }
    }

    return NextResponse.json({ error: "Rate Limiting Error" }, { status: 500 });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ error: error.message || error }, { status: 500 });
  }
}
