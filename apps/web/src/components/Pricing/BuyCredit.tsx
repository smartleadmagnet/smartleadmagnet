import React from "react";
import PricingCard from "@/components/Pricing/PricingCard";
import FeatureLine from "@/components/Pricing/FeatureLine";
import ButtonCheckout from "@/components/ButtonCheckout";
import { PricingPlan } from "@/lib/config/pricingConfig";
import { PlanTier } from "@/lib/types";

export type PricingProps = {
  plans: PricingPlan[];
};

const PricingTable: React.FC<PricingProps> = ({ plans }) => {
  return (
    <div className="mx-auto flex w-full  flex-col items-center justify-center gap-6 md:flex-row ">
      {plans?.map((plan) => {
        return (
          <div className={"z-1 relative mb-10 w-full rounded-lg bg-gray-900  p-6 sm:w-1/2 sm:p-8"} key={plan.priceId}>
            <div className="relative z-10">
              <div className="mb-6 flex flex-row items-center justify-between">
                <h3 className="jakarta text-2xl font-semibold text-gray-100 sm:text-4xl">{plan.name}</h3>
                {plan.name === "Credit 1000" && (
                  <span className="order-first inline-block rounded-full bg-black bg-opacity-20 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white lg:order-none">
                    Popular
                  </span>
                )}
              </div>
              <PricingCard plan={plan} />
              {/*<ul className="mb-6 space-y-2 text-gray-300">*/}
              {/*  {plan.features?.map((feature) => {*/}
              {/*    return <FeatureLine title={feature} key={plan.name + feature} />;*/}
              {/*  })}*/}
              {/*</ul>*/}
              <ButtonCheckout
                title="Get Started"
                priceId={plan.priceId}
                primaryClass="block w-full rounded-lg border-2 border-white px-8 py-3 text-center text-sm font-semibold text-gray-100 outline-none transition duration-100 hover:bg-opacity-20 md:text-base"
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PricingTable;
