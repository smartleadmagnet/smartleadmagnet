import Image from "next/image";

interface ProcessCardProps {
  step: number;
  iconSrc: string;
  title: string;
  text: string;
  className?: string;
}

const ProcessCard: React.FC<ProcessCardProps> = ({ step, iconSrc, title, text, className }) => {
  return (
    <div
      className={`rounded-lg border border-gray-300 bg-gray-800 p-6 transition-transform duration-300 hover:scale-105 ${className}`}
    >
      <div className="relative mb-10 h-20">
        <Image src={iconSrc} alt="process card" width={80} height={80} objectFit="contain" />
      </div>
      <div className="text-left">
        <div className="relative mb-10  inline-block  border-b-2 border-[#BEF8FC] text-3xl text-[#BEF8FC]">
          Step {step}
        </div>
        <h4 className="mb-2 text-2xl text-2xl font-bold text-white">{title}</h4>
        <p className="text-lg text-white">{text}</p>
      </div>
    </div>
  );
};

export default ProcessCard;
