import Link from "next/link";
import Image from "next/image";
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
    <div
      
      className={`flex flex-col rounded-lg border border-gray-200 bg-white p-6 shadow-md transition-transform duration-300 hover:scale-105 hover:shadow-lg ${className}`}
      
    >
      <div className="mb-4">
        <Image src={iconSrc} alt={title} className="h-[150px] w-auto" height={100} width={100} />
      </div>
      <div>
        <h3 className="mb-2 text-xl font-semibold">{title}</h3>
        <p className="mb-4 min-h-[50px] text-gray-600">{text}</p>
      </div>
    </div>
  );
};

export default ServiceCard;
