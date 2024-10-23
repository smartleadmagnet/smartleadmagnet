import Accordion from "@/components/Accordion";
import faqs from "@/data/faq.json";

const AccordionSection = () => {
  return (
    <div className="bg-gradient-to-r from-cyan-500 to-blue-400 py-16">
      <div className="mx-auto max-w-[1000px] px-4">
        <div className="flex flex-col">
          {/* Title Section */}
          <h2 className="mb-4 text-center text-3xl font-bold text-white md:text-5xl">Frequently Asked Questions</h2>
          <p className="mx-auto mb-8 max-w-[600px] text-center text-xl text-gray-700 text-white md:text-2xl">
            Explore our FAQs to learn more about how SmartLead Magnet can transform your website to lead genration
            machine.
          </p>

          {/* FAQ Section */}
          <Accordion faqs={faqs} />
        </div>
      </div>
    </div>
  );
};

export default AccordionSection;
