import { NextRequest, NextResponse } from "next/server";
import { validateLeadWithInput } from "@smartleadmagnet/llm";

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
      const result = await validateLeadWithInput({ leadMagnet: lead, promptInput: payload, apiKey });

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
    }

    return NextResponse.json({ error: "Rate Limiting Error" }, { status: 500 });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ error: error.message || error }, { status: 500 });
  }
}
