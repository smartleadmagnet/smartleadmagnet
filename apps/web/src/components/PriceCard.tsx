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
        <label htmlFor="pricing-toggle" className="relative mb-8 flex cursor-pointer items-center justify-center">
          <p className="mr-2 text-sm text-gray-500">Monthly</p>
          <div className="relative h-5 w-10 rounded-full bg-gray-300">
            <div className="checkbox-switch absolute left-0 top-0 h-5 w-5 transform rounded-full bg-cyan-500 transition-transform duration-300 ease-in-out"></div>
          </div>
          <p className="ml-2 text-sm text-gray-500">Yearly</p>
        </label>

        <div className="monthly-table mx-auto flex w-full max-w-[1000px] flex-col border md:flex-row">
          <div className="flex-1 border-b p-[70px] md:border-b-0 md:border-r">
            <span className="text-lg font-bold text-gray-700">For business</span>

            <h2 className="mt-2 text-4xl font-semibold">
              <span className="dynamic-value text-5xl text-gray-800">$39</span>
              <span className="text-lg text-gray-600">/Per Month</span>
            </h2>
            <p className="mt-2 text-gray-600">
              One way to determine how much money you need is to do a break-even analysis.
            </p>
          </div>
          <div className="flex-1 p-[70px]">
            <h3 className="mb-4 text-xl font-semibold text-gray-700">That includes:</h3>
            <ul className="mb-10 space-y-4">
              {listItems.map((item, index) => (
                <li key={index} className="flex items-center">
                  <Icon name="list_icon" color="cyan" />
                  <span className="ml-4 font-bold text-gray-700">{item}</span>
                </li>
              ))}
            </ul>

            <div className="mt-4">
              <Button className="btn-primary w-full">
                <span>Choose Plan</span>
              </Button>
            </div>
          </div>
        </div>
        <div className="yearly-table mx-auto flex hidden w-full max-w-[1000px] flex-col border md:flex-row">
          <div className="flex-1 border-b p-[70px] md:border-b-0 md:border-r">
            <span className="text-lg font-bold text-gray-700">For business</span>

            <h2 className="mt-2 text-4xl font-semibold">
              <span className="dynamic-value text-5xl text-gray-800">$399</span>
              <span className="text-lg text-gray-600">/Per Year</span>
            </h2>
            <p className="mt-2 text-gray-600">
              One way to determine how much money you need is to do a break-even analysis.
            </p>
          </div>
          <div className="flex-1 p-[70px]">
            <h3 className="mb-4 text-xl font-semibold text-gray-700">That includes:</h3>
            <ul className="mb-10 space-y-4">
              {listItems.map((item, index) => (
                <li key={index} className="flex items-center">
                  <Icon name="list_icon" color="cyan" />
                  <span className="ml-4 font-bold text-gray-700">{item}</span>
                </li>
              ))}
            </ul>

            <div className="mt-4">
              <Button className="btn-primary w-full">
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
