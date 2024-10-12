import PriceCard from "@/components/PriceCard";

export default function Pricing() {
	return (
		<section className="bg-white dark:bg-gray-900">
			<div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
				<div className="mx-auto max-w-screen-md text-center mb-8 lg:mb-12">
					<h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
						Skyrocket Your Conversions with Paid Plan
					</h2>
					<p className="mb-5 font-light text-gray-500 sm:text-xl dark:text-gray-400">
						Unlock endless possibility and make your lead generation better.
					</p>
				</div>
				
				<PriceCard/>
			</div>
		</section>
	);
}
