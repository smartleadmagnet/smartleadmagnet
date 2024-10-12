import Link from "next/link";

interface ServiceCardProps {
  to?: string;
  className?: string;
  iconSrc: string;
  title: string;
  text: string;
  linkText?: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  to = "/",
  className = "",
  iconSrc,
  title,
  text,
  linkText = "Discover More",
}) => {
  return (
    <Link href={to} className={`flex flex-col bg-white border border-gray-200 shadow-md hover:shadow-lg hover:scale-105 transition-transform duration-300 rounded-lg p-6 ${className}`} passHref>
      
      
        <div className="mb-4">
          <img src={iconSrc} alt={title} className="w-12 h-12" />
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-2">{title}</h3>
          <p className="text-gray-600 mb-4 min-h-[50px]">{text}</p>
          <span className="text-black-500 font-bold hover:underline">{linkText}</span>
        </div>
    </Link>
  );
};

export default ServiceCard;
