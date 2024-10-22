import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const origin = requestUrl.origin;
  return NextResponse.redirect(`${origin}/api/auth/signout?callbackUrl=/`);
}
