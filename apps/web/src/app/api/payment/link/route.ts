import { NextRequest, NextResponse } from "next/server";
import { getSingInLink } from "@/actions/stripe";

export async function GET(req: NextRequest) {
  // get query params from the URL
  const priceId = req.nextUrl.searchParams.get("price_id");
  const referer = req.nextUrl.searchParams.get("referer");
  const link = await getSingInLink(priceId!, referer);
  return NextResponse.redirect(link!);
}
