import Accordion from "@/components/Accordion";

const AccordionSection = () => {
  const faqs = [
    {
      question: "What is Flowbite?",
      answer:
        "Flowbite is an open-source library of interactive components built on top of Tailwind CSS including buttons, dropdowns, modals, navbars, and more. Check out this guide to learn how to get started and start developing websites even faster with components on top of Tailwind CSS.",
    },
    {
      question: "Is there a Figma file available?",
      answer:
        "Flowbite is first conceptualized and designed using the Figma software so everything you see in the library has a design equivalent in our Figma file. Check out the Figma design system based on the utility classes from Tailwind CSS and components from Flowbite.",
    },
    {
      question: "What are the differences between Flowbite and Tailwind UI?",
      answer:
        "The main difference is that the core components from Flowbite are open source under the MIT license, whereas Tailwind UI is a paid product. Another difference is that Flowbite relies on smaller and standalone components, whereas Tailwind UI offers sections of pages. However, we recommend using both Flowbite, Flowbite Pro, and even Tailwind UI as there is no technical reason stopping you from using the best of two worlds. Learn more about these technologies: Flowbite Pro and Tailwind UI.",
    },
  ];

  return (
    <div className="bg-gray-100 py-20">
      <div className="container mx-auto ">
        <div className="flex">
          <div className="w-1/2 p-4">
            {/* Right column content goes here */}

            <h2 className="text-5xl font-bold mb-4">
              Don’t Miss Out on Valuable Leads
            </h2>
            <p className="text-2xl text-gray-700">
              With SmartLeadMagnet.com, you can easily build and deploy lead
              magnets that work. Say goodbye to slow, manual lead generation
              efforts, and start using our AI-powered platform to grow your
              audience and oost sales effortlessly.
            </p>
          </div>
          <div className="w-1/2">
            <Accordion faqs={faqs} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccordionSection;
