
import PriceCard from "@/components/PriceCard";
export default async function Pricing() {


	const cardData = [
		{
		  title: "Monthly",
		  description: "Best option for personal use & for your next project.",
		  price: "$39",
		  duration: "/month",
		  features: [
			{ text: 'Individual configuration' },
			{ text: 'No setup, or hidden fees' },
			{ text: 'Team size: ', emphasis: '1 developer' },
			{ text: 'Premium support: ', emphasis: '6 months' },
			{ text: 'Free updates: ', emphasis: '6 months' },
		  ],
		  buttonText: "Get started",
		  onButtonClick: () => alert('Starter plan clicked!'),
		},
		{
		  title: "Yearly",
		  description: "Great for small teams and advanced features.",
		  price: "$139",
		  duration: "/yearly",
		  features: [
			{ text: 'Everything in Starter' },
			{ text: 'Collaboration tools' },
			{ text: 'Team size: ', emphasis: 'Up to 5 developers' },
			{ text: 'Premium support: ', emphasis: '12 months' },
			{ text: 'Free updates: ', emphasis: '12 months' },
		  ],
		  buttonText: "Choose Professional",
		  onButtonClick: () => alert('Professional plan clicked!'),
		},
		{
		  title: "Enterprise",
		  description: "The best choice for larger organizations.",
		  price: "$XXX",
		  duration: "/month",
		  features: [
			{ text: 'Everything in Professional' },
			{ text: 'Custom solutions' },
			{ text: 'Team size: ', emphasis: 'Unlimited developers' },
			{ text: 'Premium support: ', emphasis: '24/7 support' },
			{ text: 'Free updates: ', emphasis: 'Lifetime' },
		  ],
		  buttonText: "Contact Sales",
		  onButtonClick: () => alert('Enterprise plan clicked!'),
		},
	  ];
  

  return (
	<section className="bg-white dark:bg-gray-900">
		 <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
		<div className="mx-auto max-w-screen-md text-center mb-8 lg:mb-12">
          <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">Skyrocket Your Conversions with Paid Plan</h2>
          <p className="mb-5 font-light text-gray-500 sm:text-xl dark:text-gray-400">Unlock endless possiblity makes your lead genration better.</p>
      </div>
		<div className="space-y-8 lg:grid lg:grid-cols-3 sm:gap-6 xl:gap-10 lg:space-y-0">
	{cardData.map((card, index) => (
	  <PriceCard
		key={index}
		title={card.title}
		description={card.description}
		price={card.price}
		duration={card.duration}
		features={card.features}
		buttonText={card.buttonText}
		//onButtonClick={card.onButtonClick}
	  />
	))}
	</div>
	</div>

  </section>
  );
}
