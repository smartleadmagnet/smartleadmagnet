import Image from 'next/image';

interface ProcessCardProps {
  step: number;
  iconSrc: string;
  title: string;
  text: string;
  className?: string;
}

const ProcessCard: React.FC<ProcessCardProps> = ({ step, iconSrc, title, text, className }) => {
  return (
    <div className={`border border-gray-300 rounded-lg p-6 bg-gray-800 transition-transform duration-300 hover:scale-105 ${className}`}>
      <div className="relative h-20 mb-10">
        <Image src={iconSrc} alt="process card" width={80} height={80} objectFit="contain" />
      </div>
      <div className="text-left">
      <div className="border-b-2 border-[#BEF8FC]  inline-block  text-[#BEF8FC] text-3xl relative mb-10">Step {step}</div>
        <h4 className="text-2xl text-white font-bold mb-2 text-2xl">{title}</h4>
        <p className="text-white text-lg">{text}</p>
      </div>
    </div>
  );
};

export default ProcessCard;
