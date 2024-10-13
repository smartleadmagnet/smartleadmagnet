import { NextRequest, NextResponse } from "next/server";
import { validateLeadWithInput } from "@smartleadmagnet/llm";
import { createLeadMagnetUsageLog, getLeadMagnetById, updateLeadMagnetUsage } from "@smartleadmagnet/services";

import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { getIPAddress } from "@/utils/ip";

let rateLimit: Ratelimit | undefined;

if (process.env.UPSTASH_REDIS_REST_URL) {
  rateLimit = new Ratelimit({
    redis: Redis.fromEnv(),
    // Allow 100 requests per day (~5-10 prompts)
    limiter: Ratelimit.fixedWindow(10, "1440 m"),
    analytics: true,
    prefix: "smartleadmagnet",
  });
}

export const dynamic = "force-dynamic"; // defaults to force-static

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  // get slug id value from the request
  try {
    const identifier = getIPAddress();
    if (rateLimit && !identifier) {
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
      await createLeadMagnetUsageLog({
        leadMagnetId: lead.id,
        ipAddress: identifier,
        payload: payload,
      });
      // update the DB that it has been used
      return NextResponse.json({ message: result });
    }
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ error: error.message || error }, { status: 500 });
  }
  return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
}
