import { NextRequest, NextResponse } from "next/server";
import { validateLeadWithInput } from "@smartleadmagnet/llm";
import { createLeadMagnetUsageLog, getLeadMagnetById, updateLeadMagnetUsage } from "@smartleadmagnet/services";

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
    // Allow 100 requests per day (~5-10 prompts)
    limiter: Ratelimit.fixedWindow(5000, "1440 m"),
    analytics: true,
    prefix: "smartleadmagnet",
  });
}

export const dynamic = "force-dynamic"; // defaults to force-static

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const identifier = getIPAddress();
    console.log("identifier", identifier, rateLimit, process.env.UPSTASH_REDIS_REST_URL);

    if (rateLimit && identifier) {
      const { success } = await rateLimit?.limit(identifier);
      if (!success) {
        return NextResponse.json({ error: "No requests left. Please try again in 24h." }, { status: 429 });
      }

      const lead = await getLeadMagnetById(params.id);
      const payload = await req.json();
      const result = await validateLeadWithInput({ leadMagnet: lead, promptInput: payload });

      // Update the lead magnet usage (increment usedCount and update lastUsedAt)
      await updateLeadMagnetUsage(lead.id);

      // Log the usage with payload and IP address
      let webhookStatus = "pending";
      let emailSent = false;

      // Trigger the webhook if set
      if (lead.webhook) {
        const webhookResult = await triggerWebhook(lead.webhook, { leadId: lead.id, payload, ip: identifier });
        webhookStatus = webhookResult.success ? "success" : "failed";
      }

      const emailComponent = lead.components?.find((item) => item.type === "email");
      if (lead.emailSubject && lead.emailContent && emailComponent) {
        try {
          // Convert email HTML to plain text if necessary
          const emailHtml = lead.emailContent;
          const emailText = convert(emailHtml);

          // Send the email
          await sendEmail(payload[emailComponent.name], lead.emailSubject, emailText, emailHtml);

          // Log email success
          console.log("Email sent successfully");
          emailSent = true;
        } catch (e) {
          console.log("Email sending failed", e.message);
          // Optionally, you can update the webhook status or log email failure
        }
      }

      // Update the usage log with the webhook status
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
