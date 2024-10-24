import { NextRequest, NextResponse } from "next/server";
import { getSessionUser } from "@/services/user";
import { sendEmailToUnRegisterUser } from "@/lib/email";
import { convert } from "html-to-text";

export const dynamic = "force-dynamic";
export const maxDuration = 60; // defaults to force-static

export async function POST(req: NextRequest) {
  // get slug id value from the request
  const user = await getSessionUser();
  if (user?.id) {
    const payload = await req.json();
    const emailHtml = payload.content;
    const result = await sendEmailToUnRegisterUser(user?.email!, payload.subject, convert(emailHtml), emailHtml);
    return NextResponse.json(result);
  }
  return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
}
