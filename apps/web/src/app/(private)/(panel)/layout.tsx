import WebisteLayout from "@/components/Layout/website";

import { getSessionUser } from "@/services/user";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
	                                              children,
                                              }: {
	children: React.ReactNode;
}) {
	const user = await getSessionUser();
	// @ts-ignore
	if (!user?.id) {
		return redirect("/login");
	}
	
	return <WebisteLayout>{children}</WebisteLayout>;
}
