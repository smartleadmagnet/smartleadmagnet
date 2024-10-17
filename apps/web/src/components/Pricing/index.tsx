import React from "react";
import pricingConfig, { PricingPlan } from "@/lib/config/pricingConfig";
import PricingTable from "@/components/Pricing/PricingTable";

export type PricingProps = {
  title?: string;
  description?: string;
  plans?: PricingPlan[];
  mouseAuraColor?: string;
  showDivider?: boolean;
};

const PricingPlan: React.FC<PricingProps> = ({ title = pricingConfig.title }) => {
  const userPlans = pricingConfig.plans!;
  return (
    <div className="z-0 mt-5 flex h-full min-h-[75vh] w-full flex-col items-center justify-start">
      <h1 className="text-center text-4xl text-[36px] font-bold leading-[40px] lg:text-[52px] lg:leading-[60px]">
        {title}
      </h1>
      <div className="flex max-w-5xl flex-col items-start justify-center">
        <PricingTable plans={userPlans} />
      </div>
    </div>
  );
};

export default PricingPlan;
