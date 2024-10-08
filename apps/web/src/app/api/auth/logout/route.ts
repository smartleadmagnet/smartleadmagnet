import { NextResponse } from "next/server";

export const runtime = "edge";
export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const origin = requestUrl.origin;
  return NextResponse.redirect(`${origin}/api/auth/signout?callbackUrl=/`);
}
