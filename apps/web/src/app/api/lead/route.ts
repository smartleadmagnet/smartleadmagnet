import { NextResponse } from "next/server";
import { getSessionUser } from "@/services/user";
import { createLead } from "@/actions/lead-magnet";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

export async function POST() {
  try {
    const user = await getSessionUser();
    if (user?.id) {
      const lead = await createLead();
      return NextResponse.json(lead);
    }
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  } catch (error) {
    return NextResponse.json({ message: "Error saving API key", error }, { status: 500 });
  }
}
