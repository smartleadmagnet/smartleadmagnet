import { NextRequest, NextResponse } from "next/server";
import { getSessionUser } from "@/services/user";
import { validateLeadWithInput } from "@smartleadmagnet/llm";
import { getLeadMagnetById } from "@smartleadmagnet/services";

export const dynamic = "force-dynamic";
export const maxDuration = 60; // defaults to force-static

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  // get slug id value from the request
  const user = await getSessionUser();
  if (user?.id) {
    try {
      const lead = await getLeadMagnetById(params.id);
      if (lead.userId !== user?.id!) {
        return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
      }
      const payload = await req.json();
      const result = await validateLeadWithInput({ leadMagnet: lead, promptInput: payload });
      return NextResponse.json({ message: result });
    } catch (error: any) {
      console.log(error);
      return NextResponse.json({ error: error.message || error }, { status: 500 });
    }
  }
  return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
}
