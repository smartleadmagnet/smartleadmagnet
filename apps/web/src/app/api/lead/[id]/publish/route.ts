import { NextRequest, NextResponse } from "next/server";
import { updateLeadMagnet } from "@smartleadmagnet/services";
import { getUserInfo } from "@/actions/user";

export const dynamic = "force-dynamic"; // defaults to force-static

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  // get slug id value from the request
  const user = await getUserInfo();
  if (user?.id) {
    try {
      if (!user.Payments?.length) {
        return NextResponse.json({ paymentRequired: true }, { status: 409 });
      }
      if (!user.Credit || (user?.Credit?.total || 0) > (user?.Credit?.used || 0)) {
        return NextResponse.json({ creditsRequired: true }, { status: 409 });
      }
      const updatedLead = await updateLeadMagnet(params.id, user?.id, { status: "published" });
      return NextResponse.json(updatedLead);
    } catch (error: any) {
      return NextResponse.json({ error: error.message || error }, { status: 500 });
    }
  }
  return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
}
