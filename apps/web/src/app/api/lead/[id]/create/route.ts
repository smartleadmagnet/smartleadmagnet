import { NextRequest, NextResponse } from "next/server";
import { getSessionUser } from "@/services/user";
import { updateLeadMagnet } from "@smartleadmagnet/services";
import { createAILead } from "@smartleadmagnet/llm";

export const dynamic = "force-dynamic";
export const maxDuration = 60; // defaults to force-static

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  // get slug id value from the request
  const user = await getSessionUser();
  if (user?.id) {
    try {
      const payload = await req.json();
      const data = await createAILead(payload);
      if (data?.components?.length && data?.outputType && data?.prompt) {
        const updatedLead = await updateLeadMagnet(params.id, user?.id!, {
          output: data?.outputType,
          prompt: data?.prompt,
          components: data?.components,
        });
        return NextResponse.json(updatedLead);
      } else {
        return NextResponse.json({ error: "Failed to create lead magnet" }, { status: 500 });
      }
    } catch (error: any) {
      console.log(error);
      return NextResponse.json({ error: error.message || error }, { status: 500 });
    }
  }
  return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
}
