import React from "react";
import Icon from "@smartleadmagnet/ui/components/icon";

// Define the interface for the FAQ items
interface Faq {
  question: string;
  answer: string;
}

// Define the interface for the props of the Accordion component
interface AccordionProps {
  faqs: Faq[]; // Array of FAQ objects
}

const Accordion: React.FC<AccordionProps> = ({ faqs }) => {
  return (
    <div className="w-full">
      {faqs.map((faq, index) => (
        <div key={index} className="mb-4 rounded-lg border border-gray-200">
          {/* Accordion checkbox and label */}
          <input type="checkbox" id={`accordion-${index}`} className="peer hidden" />
          <label
            htmlFor={`accordion-${index}`}
            className="flex cursor-pointer items-center justify-between bg-gray-100 p-4 peer-checked:rounded-t-lg peer-checked:border-b-0 peer-checked:bg-gray-200"
          >
            <span>{faq.question}</span>
            <span className="transform transition-transform duration-300 peer-checked:rotate-180">
              <Icon name="arrow-down" />
            </span>
          </label>
          {/* Accordion content */}
          <div className="max-h-0 overflow-hidden border-t border-gray-200 bg-white transition-all duration-300 peer-checked:max-h-40 peer-checked:p-4">
            <p className="text-gray-600">{faq.answer}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Accordion;
