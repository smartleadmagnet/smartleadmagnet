import { NextResponse } from "next/server";
import { updateUserKey } from "@smartleadmagnet/services";
import { getSessionUser } from "@/services/user";
import { uuid } from "next-s3-upload";

export async function POST() {
  try {
    const user = await getSessionUser();
    if (user?.id) {
      const key = uuid();
      await updateUserKey({ id: user?.id!, key });
      return NextResponse.json({ key });
    }
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  } catch (error) {
    return NextResponse.json({ message: "Error saving API key", error }, { status: 500 });
  }
}
