import { Button } from "@smartleadmagnet/ui/components/ui/button";
import { Separator } from "@smartleadmagnet/ui/components/ui/separator";
import { createLead } from "@/actions/lead-magnet";
import { redirect } from "next/navigation";

export default async function Home() {
	const onCreate = async () => {
		"use server";
		const lead = await createLead();
		console.log({ lead })
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
				<li
					key="Test"
					className='rounded-lg border p-4 shadow-md hover:shadow-lg'
				>
					<div className='mb-8 flex items-center justify-between'>
						<div
							className={`flex size-10 items-center justify-center rounded-lg bg-muted p-2`}
						>
							Test Logo
						</div>
						<Button
							variant='outline'
							size='sm'
							className="border border-blue-300 bg-blue-50 hover:bg-blue-100 dark:border-blue-700 dark:bg-blue-950 dark:hover:bg-blue-900"
						>
							Connected
						</Button>
					</div>
					<div>
						<h2 className='mb-1 font-semibold'>Test</h2>
						<p className='line-clamp-2 text-gray-500'>This is test app.</p>
					</div>
				</li>
			</ul>
		</div>
	);
}