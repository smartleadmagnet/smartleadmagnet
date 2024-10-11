import Icon from "@smartleadmagnet/ui/components/icon";
import { Button } from "@smartleadmagnet/ui/components/ui/button";

const PriceCard: React.FC = () => {
  const listItems = [
    "Live chat and email",
    "Fully managed program",
    "Experienced team members",
    "Step by step working process",
    "Re-evaluation project management",
  ];

  return (
    <>
      <div className="price-table">
        {/* Checkbox to toggle pricing */}
        <input type="checkbox" id="pricing-toggle" className="hidden" />

        {/* Custom switch using label and checkbox */}
        <label
          htmlFor="pricing-toggle"
          className="relative cursor-pointer flex items-center justify-center mb-8"
        >
          <p className="text-sm text-gray-500 mr-2">Monthly</p>
          <div className="w-10 h-5 bg-gray-300 rounded-full relative">
            <div className="absolute top-0 left-0 w-5 h-5 bg-cyan-500 rounded-full transform transition-transform duration-300 ease-in-out checkbox-switch"></div>
          </div>
          <p className="ml-2 text-sm text-gray-500">Yearly</p>
        </label>

        <div className="border w-full max-w-[1000px] mx-auto flex flex-col md:flex-row monthly-table">
          <div className="p-[70px] border-b md:border-b-0 md:border-r flex-1">
            <span className="text-lg font-bold text-gray-700">
              For business
            </span>

            <h2 className="text-4xl font-semibold mt-2">
              <span className="text-gray-800 text-5xl dynamic-value">$39</span>
              <span className="text-lg text-gray-600">/Per Month</span>
            </h2>
            <p className="text-gray-600 mt-2">
              One way to determine how much money you need is to do a break-even
              analysis.
            </p>
          </div>
          <div className="p-[70px] flex-1">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">
              That includes:
            </h3>
            <ul className="space-y-4 mb-10">
              {listItems.map((item, index) => (
                <li key={index} className="flex items-center">
                  <Icon name="list_icon" color="cyan" />
                  <span className="ml-4 text-gray-700 font-bold">{item}</span>
                </li>
              ))}
            </ul>

            <div className="mt-4">
              <Button className="w-full btn-primary">
                <span>Choose Plan</span>
              </Button>
            </div>
          </div>
        </div>
        <div className="border w-full max-w-[1000px] mx-auto flex flex-col md:flex-row yearly-table hidden">
          <div className="p-[70px] border-b md:border-b-0 md:border-r flex-1">
            <span className="text-lg font-bold text-gray-700">
              For business
            </span>

            <h2 className="text-4xl font-semibold mt-2">
              <span className="text-gray-800 text-5xl dynamic-value">$399</span>
              <span className="text-lg text-gray-600">/Per Year</span>
            </h2>
            <p className="text-gray-600 mt-2">
              One way to determine how much money you need is to do a break-even
              analysis.
            </p>
          </div>
          <div className="p-[70px] flex-1">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">
              That includes:
            </h3>
            <ul className="space-y-4 mb-10">
              {listItems.map((item, index) => (
                <li key={index} className="flex items-center">
                  <Icon name="list_icon" color="cyan" />
                  <span className="ml-4 text-gray-700 font-bold">{item}</span>
                </li>
              ))}
            </ul>

            <div className="mt-4">
              <Button className="w-full btn-primary">
                <span>Choose Plan</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PriceCard;
