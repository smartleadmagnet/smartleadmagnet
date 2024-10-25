import { NextRequest, NextResponse } from "next/server";
import { getSessionUser } from "@/services/user";
import { triggerWebhook } from "@/utils/webhook";

export const dynamic = "force-dynamic";
export const maxDuration = 60; // defaults to force-static

export async function POST(req: NextRequest) {
  // get slug id value from the request
  const user = await getSessionUser();
  if (user?.id) {
    const payload = await req.json();
    const { url } = payload;
    const result = await triggerWebhook(url, { test: true });
    return NextResponse.json(result);
  }
  return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
}
