import React from "react";
import PricingCard from "@/components/Pricing/PricingCard";
import FeatureLine from "@/components/Pricing/FeatureLine";
import classNames from "classnames";
import ButtonCheckout from "@/components/ButtonCheckout";
import { PricingPlan } from "@/lib/config/pricingConfig";
import { PlanTier } from "@/lib/types";

export type PricingProps = {
  plans: PricingPlan[];
};

const PricingTable: React.FC<PricingProps> = ({ plans }) => {
  return (
    <div>
      {/* Toggle Buttons for Monthly/Yearly */}

      <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-center gap-2 md:flex-row md:gap-0">
        {plans?.map((plan) => {
          return (
            <div
              className={classNames(
                "z-1 relative w-full rounded-lg p-6 sm:w-1/2 sm:rounded-r-none sm:p-8",
                plan.planTier === PlanTier.LIFE_TIME &&
                  "z-20 bg-gradient-to-br from-blue-600 to-purple-600 shadow-xl sm:rounded-r-lg",
                plan.planTier === PlanTier.ONE_TIME && "sm:ml-[-5px] sm:rounded-l-none sm:rounded-r-lg",
                plan.planTier === PlanTier.SUBSCRIPTION && "border border-gray-700 bg-black"
              )}
              key={plan.priceId}
            >
              {plan.planTier === PlanTier.ONE_TIME && (
                <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 p-[2px]">
                  <div className="h-full w-full rounded-lg bg-black"></div>
                </div>
              )}
              <div className="relative z-10">
                <div className="mb-6 flex flex-row items-center justify-between">
                  <h3 className="jakarta text-2xl font-semibold text-gray-100 sm:text-4xl">{plan.name}</h3>
                  {plan.planTier === PlanTier.LIFE_TIME && (
                    <span className="order-first inline-block rounded-full bg-black bg-opacity-20 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white lg:order-none">
                      Popular
                    </span>
                  )}
                </div>
                <PricingCard plan={plan} />
                <ul className="mb-6 space-y-2 text-gray-300">
                  {plan.features?.map((feature) => {
                    return <FeatureLine title={feature} key={plan.name + feature} />;
                  })}
                </ul>
                <ButtonCheckout
                  title="Get Started"
                  priceId={plan.priceId}
                  primaryClass="w-full rounded-lg border-2 border-white px-8 py-3 text-center text-sm font-semibold text-gray-100 outline-none transition duration-100 hover:bg-opacity-20 md:text-base"
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PricingTable;
