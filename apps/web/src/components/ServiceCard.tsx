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
    <Link
      href={to}
      className={`flex flex-col rounded-lg border border-gray-200 bg-white p-6 shadow-md transition-transform duration-300 hover:scale-105 hover:shadow-lg ${className}`}
      passHref
    >
      <div className="mb-4">
        <img src={iconSrc} alt={title} className="h-12 w-12" />
      </div>
      <div>
        <h3 className="mb-2 text-xl font-semibold">{title}</h3>
        <p className="mb-4 min-h-[50px] text-gray-600">{text}</p>
        <span className="text-black-500 font-bold hover:underline">{linkText}</span>
      </div>
    </Link>
  );
};

export default ServiceCard;
