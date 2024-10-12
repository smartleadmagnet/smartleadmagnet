import TestimonialCard from "@/components/TestimonialCard";
import Link from "next/link";

interface Testimonial {
	title: string;
	text: string;
	authorImage: string;
	authorName: string;
	authorPosition: string;
}

const data: Testimonial[] = [
	{
		title: "Amazing home workout solution!",
		text: "I found this app randomly and it's been a game changer. My energy is through the roof and I feel stronger than ever. Highly recommend!",
		authorImage: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDEwfHxtYW58ZW58MHx8fHwxNjYwNjM1ODcz&ixlib=rb-1.2.1&q=80&w=400",
		authorName: "John Doe",
		authorPosition: "Fitness Enthusiast",
	},
	{
		title: "Incredible fitness app experience!",
		text: "This app really pushed me to regain my fitness confidence after a long break. Absolutely love the personalized workouts! 🙌",
		authorImage: "https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDIwfHxtYW58ZW58MHx8fHwxNjYwNjM1ODcz&ixlib=rb-1.2.1&q=80&w=400",
		authorName: "Jane Smith",
		authorPosition: "Software Engineer",
	},
	{
		title: "Perfect for home workouts",
		text: "No gym equipment? No problem! The workouts are effective and the tips are spot on. I've never felt better, and the nutritional guidance is a bonus.",
		authorImage: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDI2fHxtYW58ZW58MHx8fHwxNjYwNjM1ODcz&ixlib=rb-1.2.1&q=80&w=400",
		authorName: "Emily Johnson",
		authorPosition: "University Student",
	},
	{
		title: "Great fitness community",
		text: "The workouts are fun and easy to follow, and the sense of community is a real plus. The recipes are delicious too! Great job team! 💪",
		authorImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDI2fHxtYW58ZW58MHx8fHwxNjYwNjM1ODcz&ixlib=rb-1.2.1&q=80&w=400",
		authorName: "Michael Brown",
		authorPosition: "Entrepreneur",
	},
	{
		title: "Highly recommend this app!",
		text: "The exercises are challenging but enjoyable, and I always feel accomplished after a session. Plus, the community is very supportive. 👌",
		authorImage: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDIwfHxtYW58ZW58MHx8fHwxNjYwNjM1ODcz&ixlib=rb-1.2.1&q=80&w=400",
		authorName: "Sarah Williams",
		authorPosition: "Content Creator",
	},
	{
		title: "Back in shape with this app!",
		text: "I hadn't exercised in years, but this app got me back into it. The workouts are fun, and my whole family is joining in. Love it! 😍",
		authorImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDI5fHxtYW58ZW58MHx8fHwxNjYwNjM1ODcz&ixlib=rb-1.2.1&q=80&w=400",
		authorName: "David Taylor",
		authorPosition: "Graphic Designer",
	},
];


const ClientSection = () => {
	return (
		<div className="bg-gray-50 py-20" id="testimonial">
			<div className="container mx-auto px-4">
				{/* Section title */}
				<div className="text-center mb-10">
					<h2 className="text-5xl font-bold text-gray-800 mb-8">What out clients say?</h2>
				</div>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{data.map((item, index) => (
						<div key={index} className="flex justify-center">
							
							<TestimonialCard {...item} />
						
						</div>
					))}
				</div>
				<div className="text-center mt-20">
					<Link
						className="bg-cyan-500 text-white font-bold py-3 px-6 rounded-lg text-xl hover:bg-cyan-600 sm:py-4 sm:px-8 sm:text-2xl"
						href="/app"
					>
						Read All The Reviews On Trustpilot.com
					</Link>
				</div>
			</div>
		</div>
	);
};

export default ClientSection;
