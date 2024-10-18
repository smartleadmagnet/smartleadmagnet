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

const PricingPlan: React.FC<PricingProps> = ({
  title = pricingConfig.title,
  description = pricingConfig.description,
}) => {
  const userPlans = pricingConfig.plans!;
  return (
    <div className="container my-10">
      <h1 className="mb-5 max-w-[1000px] text-2xl text-[36px] font-bold leading-[40px] lg:text-[52px] lg:leading-[60px]">
        {title}
      </h1>
      <div>{description}</div>
      <PricingTable plans={userPlans} />
    </div>
  );
};

export default PricingPlan;
