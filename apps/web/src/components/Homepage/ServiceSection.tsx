import ServiceCard from "@/components/ServiceCard";

// Define the shape of the data array for type safety
interface ServiceData {
  iconSrc: string;
  title: string;
  description: string;
}

const data: ServiceData[] = [
  {
    iconSrc: "https://placehold.co/100x100.png",
    title: "Marketers",
    description:
      "This is where we help you clearly define your target audience & break it up into specific ways",
  },
  {
    iconSrc: "https://placehold.co/100x100.png",
    title: "Startups",
    description:
      "Grow your email list and reach more customers.",
  },
  {
    iconSrc: "https://placehold.co/100x100.png",
    title: "Agencies",
    description:
      "Offer your clients seamless lead generation solutions.",
  },
  {
    iconSrc: "https://placehold.co/100x100.png",
    title: "Entrepreneurs",
    description:
      "Create valuable offers that attract and convert your target audience.",
  },
];

const ServiceSection: React.FC = () => {
  return (
    <div className="service-section bg-gray-100 py-20" id="services">
      <div className="container mx-auto">
        {/* Section title */}
        <div className="text-center mb-10">
          <h2 className="text-5xl font-bold text-gray-800 mb-[80px]">Who Is It For?</h2>
        </div>

        {/* Service cards grid */}
        <div className="flex flex-wrap justify-center gap-8">
          {data.map(({ iconSrc, title, description }, index) => (
            <div key={index} className="w-full   lg:w-[45%] mb-8">
              <ServiceCard
                iconSrc={iconSrc}
                title={title}
                text={description} // 'text' instead of 'description' for consistency with ServiceCard
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServiceSection;
