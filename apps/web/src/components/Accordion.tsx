import React from "react";
import Icon from "@smartleadmagnet/ui/components/icon"


// Define the interface for the FAQ items
interface Faq {
	question: string;
	answer: string;
}

// Define the interface for the props of the Accordion component
interface AccordionProps {
	faqs: Faq[]; // Array of FAQ objects
}

const Accordion: React.FC<AccordionProps> = ({faqs}) => {
	return (
		<div className="w-full">
			{faqs.map((faq, index) => (
				<div key={index} className="mb-4 border border-gray-200 rounded-lg">
					{/* Accordion checkbox and label */}
					<input type="checkbox" id={`accordion-${index}`} className="hidden peer"/>
					<label
						htmlFor={`accordion-${index}`}
						className="flex justify-between items-center p-4 bg-gray-100 cursor-pointer peer-checked:bg-gray-200 peer-checked:border-b-0 peer-checked:rounded-t-lg"
					>
						<span>{faq.question}</span>
						<span className="transition-transform duration-300 transform peer-checked:rotate-180">
              <Icon name="arrow-down"/>
            </span>
					</label>
					{/* Accordion content */}
					<div
						className="max-h-0 overflow-hidden transition-all duration-300 peer-checked:max-h-40 peer-checked:p-4 bg-white border-t border-gray-200">
						<p className="text-gray-600">{faq.answer}</p>
					</div>
				</div>
			))}
		</div>
	);
};

export default Accordion;
