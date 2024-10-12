import Accordion from "@/components/Accordion";

const AccordionSection = () => {
  const faqs = [
    {
      question: "What is DummyLib?",
      answer:
        "DummyLib is a fictional open-source library that provides various components built on a CSS framework for quick and easy website development.",
    },
    {
      question: "Is there a design file available?",
      answer:
        "Yes, DummyLib comes with a design file, available in popular design software, to help you integrate its components visually before coding.",
    },
    {
      question: "What are the differences between DummyLib and SuperUI?",
      answer:
        "DummyLib is free and open source, focusing on individual components, while SuperUI is a premium product offering full-page layouts. Both can be used together for an enhanced development experience.",
    },
  ];

  return (
    <div className="bg-gray-100 py-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row">
          <div className="mb-8 md:mb-0 md:w-1/2 md:p-4">
            {/* Right column content */}
            <h2 className="mb-4 text-3xl font-bold md:text-5xl">Don’t Miss Out on Valuable Leads</h2>
            <p className="text-xl text-gray-700 md:text-2xl">
              With SmartLeadMagnet.com, you can easily build and deploy lead magnets that work. Say goodbye to slow,
              manual lead generation efforts, and start using our AI-powered platform to grow your audience and boost
              sales effortlessly.
            </p>
          </div>
          <div className="md:w-1/2">
            <Accordion faqs={faqs} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccordionSection;
