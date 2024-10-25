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

import prisma from "@smartleadmagnet/database";

let rateLimit: Ratelimit | undefined;

if (process.env.UPSTASH_REDIS_REST_URL) {
  rateLimit = new Ratelimit({
    redis: Redis.fromEnv(),
    limiter: Ratelimit.fixedWindow(10, "1440 m"),
    analytics: true,
    prefix: "smartleadmagnet",
  });
}

export const dynamic = "force-dynamic";
export const maxDuration = 60;

export async function POST(req: NextRequest) {
  try {
    const identifier = getIPAddress();

    if (rateLimit && identifier) {
      const { success } = await rateLimit.limit(identifier);
      if (!success) {
        return NextResponse.json({ error: "No requests left. Please try again in 24h." }, { status: 429 });
      }
    }

    // Extract and validate the Authorization header
    const authHeader = req.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const token = authHeader.substring(7); // Remove "Bearer " prefix

    // Validate the authorization key against the User model
    const user = await prisma.user.findFirst({
      where: { key: token },
    });

    if (!user) {
      return NextResponse.json({ error: "Invalid API key" }, { status: 401 });
    }

    // Parse the request body and extract the 'id' and other payload data
    const payload = await req.json();
    const { id, ...rest } = payload;

    if (!id) {
      return NextResponse.json({ error: "Missing 'id' in request body" }, { status: 400 });
    }

    // Retrieve the lead magnet by ID
    const lead = await getLeadMagnetById(id);

    // Ensure the lead magnet exists and belongs to the authenticated user
    if (!lead) {
      return NextResponse.json({ error: "Lead magnet not found or access denied" }, { status: 404 });
    }

    // Check user's credit and API key usage
    const credit = await getCredit(user?.id!);
    // @ts-ignore
    let apiKey = lead?.apiKey?.apiKey;
    if (credit?.total > credit?.used) {
      apiKey = null;
    }

    if (process.env.NODE_ENV !== "development" && !apiKey && (!credit || credit.total <= credit.used)) {
      return NextResponse.json(
        { error: "No credits left. Buy extra credit or add your own API key." },
        { status: 402 }
      );
    }

    // Validate the lead with the input payload
    const result = await validateLeadWithInput({
      leadMagnet: lead,
      promptInput: rest,
      apiKey,
    });

    // Update the lead magnet usage statistics
    await updateLeadMagnetUsage(lead.id);

    // Increment the user's used credits count
    if (credit) {
      await incrementCreditUsage(user?.id!);
    }

    let webhookStatus = "pending";
    let emailSent = false;

    // Trigger the webhook if it exists
    if (lead.webhook) {
      const webhookResult = await triggerWebhook(lead.webhook, {
        leadId: lead.id,
        payload: rest,
        ip: identifier,
      });
      webhookStatus = webhookResult.success ? "success" : "failed";
    }

    // Send an email if configured
    // @ts-ignore
    const emailComponent = lead?.components?.find((item) => item.type === "email");
    if (lead.emailSubject && lead.emailContent && emailComponent) {
      try {
        const emailHtml = lead.emailContent;
        const emailText = convert(emailHtml);
        await sendEmail(rest[emailComponent.name], lead.emailSubject, emailText, emailHtml);
        console.log("Email sent successfully");
        emailSent = true;
      } catch (e: any) {
        console.log("Email sending failed", e.message);
      }
    }

    // Log the lead magnet usage
    await createLeadMagnetUsageLog({
      leadMagnetId: lead.id,
      ipAddress: identifier,
      payload: rest,
      webhookStatus,
      emailSent,
    });

    return NextResponse.json({ message: result });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ error: error.message || error }, { status: 500 });
  }
}
