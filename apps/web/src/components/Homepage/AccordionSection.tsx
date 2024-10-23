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
    <div className="bg-gradient-to-r from-cyan-500 to-blue-400 py-16">
      <div className="max-w-[1000px] mx-auto px-4">
        <div className="flex flex-col">
          {/* Title Section */}
          <h2 className="mb-4 text-3xl font-bold md:text-5xl text-center text-white">Frequently Asked Questions</h2>
          <p className="text-xl text-gray-700 md:text-2xl mb-8 max-w-[600px] mx-auto text-center text-white">
          Explore our FAQs to learn more about how SmartLead Magnet can transform your website to lead genration machine.
          </p>
          
          {/* FAQ Section */}
          <Accordion faqs={faqs} />
        </div>
      </div>
    </div>
  );
};

export default AccordionSection;
