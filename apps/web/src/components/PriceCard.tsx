"use client"
import { useState } from "react";
import Icon from "@smartleadmagnet/ui/components/icon";
import { Button } from "@smartleadmagnet/ui/components/ui/button";
import { Switch } from "@smartleadmagnet/ui/components/ui/switch";

const PriceCard: React.FC = () => {
  const [isMonthly, setIsMonthly] = useState(true);

  const handleSwitchChange = () => {
    setIsMonthly(!isMonthly);
  };

  const listItems = [
    "Live chat and email",
    "Fully managed program",
    "Experienced team members",
    "Step by step working process",
    "Re-evaluation project management",
  ];

  return (
    <>
      <div className="flex items-center justify-center mb-8">
        <p className="text-sm text-gray-500 mr-2">Yearly</p>
        <Switch checked={isMonthly} onCheckedChange={handleSwitchChange} />
        <p className="ml-2 text-sm text-gray-500">Monthly</p>
      </div>

    <div className="border w-full max-w-[1000px] mx-auto flex w-full">
      <div className="p-[70px] border-r flex-1">
        <span className="text-lg font-bold text-gray-700">For business</span>
        <h2 className="text-4xl font-semibold mt-2">
        <span className="text-gray-800 text-5xl dynamic-value" data-yearly="$24.99" data-monthly="$30.00">
          {isMonthly ? "$30" : "$24"}
        </span>
        <span className="text-lg text-gray-600">/Per Month</span>
        </h2>
        <p className="text-gray-600 mt-2">
        One way to determine how much money you need is to do a break-even analysis.
        </p>
      </div>
      <div className="p-[70px] flex-1">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">That includes:</h3>
        <ul className="space-y-4 mb-10">
            {listItems.map((item, index) => (
            <li key={index} className="flex items-center">
                <Icon name="list_icon" color="cyan"  />
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
    </>
  );
};

export default PriceCard;
