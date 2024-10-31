import { NextResponse } from "next/server";
import { getSessionUser } from "@/services/user";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

export async function GET() {
  try {
    const user = await getSessionUser();
    if (user?.id) {
      return NextResponse.json({ data: user });
    }
    return NextResponse.json({ data: null });
  } catch (error) {
    return NextResponse.json({ message: "Error saving API key", error }, { status: 500 });
  }
}
