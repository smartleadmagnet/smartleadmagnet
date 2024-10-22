import { NextRequest, NextResponse } from "next/server";
import { createApiKey, getApiKeysByUserId, getApiKeysByUserIdWithoutKey } from "@smartleadmagnet/services";
import { getSessionUser } from "@/services/user";

export async function POST(req: NextRequest) {
  try {
    const user = await getSessionUser();
    if (user?.id) {
      const { keyName, apiKey, provider, isDefault } = await req.json();
      const newKey = await createApiKey({
        keyName,
        apiKey,
        provider,
        isDefault,
        userId: user?.id!,
      });

      return NextResponse.json(newKey);
    }
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  } catch (error) {
    return NextResponse.json({ message: "Error saving API key", error }, { status: 500 });
  }
}

export async function GET() {
  try {
    const user = await getSessionUser();
    if (user?.id) {
      const keys = await getApiKeysByUserIdWithoutKey(user?.id!);
      return NextResponse.json(keys);
    }
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  } catch (error) {
    return NextResponse.json({ message: "Error saving API key", error }, { status: 500 });
  }
}
