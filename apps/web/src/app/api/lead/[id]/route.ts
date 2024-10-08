import { NextRequest, NextResponse } from "next/server";
import { getSessionUser } from "@/services/user";
import { updateLeadMagnet } from "@smartleadmagnet/services";
export const dynamic = 'force-dynamic' // defaults to force-static

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
	// get slug id value from the request
	const user = await getSessionUser();
	if (user?.id) {
		try {
			const payload = await req.json();
			await updateLeadMagnet(params.id, user?.id, payload);
			return NextResponse.json({});
		} catch (error: any) {
			return NextResponse.json({ error: error.message || error }, { status: 500 });
		}
	}
	return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
}
