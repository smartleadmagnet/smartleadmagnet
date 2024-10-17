import React from "react";
import { PricingPlan } from "@/lib/config/pricingConfig";

const PricingCard = ({ plan }: { plan: PricingPlan }) => {
  return (
    <div className="mb-4 space-x-2">
      <span className="text-4xl font-bold text-white">${plan.discountPrice}</span>
      <span className="text-2xl text-indigo-100 line-through">${plan.originalPrice}</span>
    </div>
  );
};

export default PricingCard;
