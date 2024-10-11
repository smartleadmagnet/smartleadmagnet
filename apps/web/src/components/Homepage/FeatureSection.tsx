import ProcessCard from "@/components/ProcessCard";



const data = [
  {
    "step": 1,
    "iconSrc": "https://placehold.co/100x100.png",
    "title": "Create",
    "text": "Use our drag-and-drop interface to design a lead magnet tailored to your target audience."
  },
  {
    "step": 2,
    "iconSrc": "https://placehold.co/100x100.png",
    "title": "Customize",
    "text": "Personalize your lead magnet with your own prompts and branding."
  },
  {
    "step": 3,
    "iconSrc": "https://placehold.co/100x100.png",
    "title": "Generate",
    "text": "Get an iframe code and embed it on your website or landing page."
  }
]

interface ProcessStep {
  step: number;
  iconSrc: string;
  title: string;
  text: string;
}

const ProcessSection = () => {
  return (
    <div className="py-24 bg-gray-900 process">
      <div className="container mx-auto">
        <div className="flex justify-center text-center mb-12">
          <div className="w-full max-w-2xl">
            <h2 className="text-5xl line font-bold text-white leading-[1.2]" >
              How It Works
            </h2>
          </div>
        </div>
        <div className="flex flex-wrap justify-center gap-6">
          {data.map(({ step, iconSrc, title, text }: ProcessStep, index: number) => (
            <div
            key={index}
            className="w-full   lg:w-[30%] mb-8"
          >
            <ProcessCard
              step={step}
              iconSrc={iconSrc}
              title={title}
              text={text}
              className="h-full"
            />
          </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProcessSection;
