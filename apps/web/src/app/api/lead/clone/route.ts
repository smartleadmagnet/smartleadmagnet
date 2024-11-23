import { NextResponse } from "next/server";
import { cloneLead } from "@/actions/lead-magnet";
import { getSessionUser } from "@/services/user";

export async function POST(request: Request) {
  const user = await getSessionUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized", isLoggedIn: false }, { status: 401 });
  }

  try {
    const { templateId } = await request.json();

    if (!templateId) {
      return NextResponse.json({ error: "Template ID is required" }, { status: 400 });
    }

    const clonedLead = await cloneLead(templateId);

    return NextResponse.json({
      isLoggedIn: true,
      lead: clonedLead,
    });
  } catch (error) {
    console.error("Error cloning lead magnet:", error);
    return NextResponse.json({ error: "Failed to clone lead magnet" }, { status: 500 });
  }
}
