import { Button } from "@smartleadmagnet/ui/components/ui/button";
import { Separator } from "@smartleadmagnet/ui/components/ui/separator";
import { createLead, getByUser } from "@/actions/lead-magnet";
import { redirect } from "next/navigation";
import AppCard from "@smartleadmagnet/ui/components/AppCard";

export default async function Home() {
	const leads = await getByUser()
	
	const onCreate = async () => {
		"use server";
		const lead = await createLead();
		redirect(`/builder/${lead.id!}`)
	};
	
	return (
		<div className="flex size-full px-5 flex-col">
			<div className="flex justify-between">
				<div>
					<h1 className='text-2xl font-bold tracking-tight'>
						Home
					</h1>
					<p className='text-muted-foreground'>
						Here&apos;s a list of your apps!
					</p>
				</div>
				</div>
		</div>
	);
}