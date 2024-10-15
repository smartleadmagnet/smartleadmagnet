import { NextRequest, NextResponse } from "next/server";
import { getSessionUser } from "@/services/user";
import { copyLeadMagnet } from "@smartleadmagnet/services";

export const dynamic = "force-dynamic"; // defaults to force-static

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  // get slug id value from the request
  const user = await getSessionUser();
  if (user?.id) {
    try {
      const newLeadMagnet = await copyLeadMagnet(params.id, user?.id);
      return NextResponse.json(newLeadMagnet);
    } catch (error: any) {
      console.log(error);
      return NextResponse.json({ error: error.message || error }, { status: 500 });
    }
  }
  return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
}
