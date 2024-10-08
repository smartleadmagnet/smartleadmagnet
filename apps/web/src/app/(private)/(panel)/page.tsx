import { Button } from "@smartleadmagnet/ui/components/ui/button";
import { Separator } from "@smartleadmagnet/ui/components/ui/separator";
import { createLead, getByUser } from "@/actions/lead-magnet";
import { redirect } from "next/navigation";
import AppCard from "@smartleadmagnet/ui/components/AppCard";

export const runtime = "edge";

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
						Apps
					</h1>
					<p className='text-muted-foreground'>
						Here&apos;s a list of your apps!
					</p>
				</div>
				<div className='my-4 flex items-end justify-between sm:my-0 sm:items-center'>
					<div className='flex flex-col gap-4 sm:my-4 sm:flex-row'>
					</div>
					<form className="flex justify-end mb-4">
						<Button
							formAction={onCreate}
							variant="outline"
							size="sm"
							className="flex items-center space-x-1 text-green-500 border-green-500 hover:bg-green-100"
						>
							Build New App
						</Button>
					</form>
				</div>
			</div>
			<Separator className='shadow w-full mt-3'/>
			<ul className='faded-bottom no-scrollbar grid gap-4 overflow-auto pb-16 pt-4 md:grid-cols-2 lg:grid-cols-3'>
				{
					leads.map((lead: any) => (
						<li key={lead.id}><AppCard id={lead.id} name={lead.name} description={lead.description}
						                           analytics={{impressions: 0, used: 0}}/></li>
					))
				}
			</ul>
		</div>
	);
}