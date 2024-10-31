import React, { Suspense } from "react";
import PricingCard from "@/components/Pricing/PricingCard";
import FeatureLine from "@/components/Pricing/FeatureLine";
import ButtonCheckout from "@/components/ButtonCheckout";
import { PricingPlan } from "@/lib/config/pricingConfig";
import { PlanTier } from "@/lib/types";
import { BorderBeam } from "@smartleadmagnet/ui/components/ui/border-beam";

export type PricingProps = {
  plans: PricingPlan[];
};

const PricingTable: React.FC<PricingProps> = ({ plans }) => {
  return (
    <div className="container mx-auto px-4">
      <div className="flex w-full flex-col items-center justify-center gap-10 lg:flex-row">
        {plans?.map((plan, index) => (
          <div
            className={`z-1 relative mb-10 w-full rounded-lg bg-gray-900 p-6 transition-transform duration-300 ease-in-out sm:w-1/3 sm:p-8 ${
              index === 1 ? "scale-[1.1] transform border-2 border-yellow-400 shadow-lg" : ""
            }`} // Applying scale and other styles to index 1
            key={plan.priceId}
          >
            <div className="relative z-10">
              <div className="mb-6 flex flex-row items-center justify-between">
                <h3 className="text-2xl font-semibold text-gray-100 sm:text-4xl">{plan.name}</h3>
                {plan.planTier === PlanTier.LIFE_TIME && (
                  <span className="order-first inline-block rounded-full bg-red-600  px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white lg:order-none">
                    Popular
                  </span>
                )}
              </div>
              <PricingCard plan={plan} />
              <ul className="mb-6 space-y-2 text-gray-300">
                {plan.features?.map((feature) => (
                  <FeatureLine title={feature.name} hint={feature.hint} key={plan.name + feature.name} />
                ))}
              </ul>

              <Suspense fallback={<div>Loading...</div>}>
                <ButtonCheckout
                  title="Get Started"
                  priceId={plan.priceId}
                  primaryClass="block w-full rounded-lg border-2 border-white px-8 py-3 text-center text-sm font-semibold text-gray-100 transition duration-100 hover:bg-opacity-20 md:text-base"
                />
              </Suspense>
            </div>
            {index === 1 && <BorderBeam size={700} duration={10} delay={9} borderWidth={10} />}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PricingTable;
