import React from "react";
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
  const lifeTimePlan = plans?.[0];
  return (
    <div className="conitaner">
      <div className="relative my-10  flex flex-col gap-2 rounded bg-gray-900 p-10">
        <h1 className="text-center text-3xl text-[36px] font-bold leading-[40px] text-white lg:text-[52px] lg:leading-[60px] ">
          {lifeTimePlan?.name}
        </h1>
        <PricingCard plan={lifeTimePlan!} />
        <ul className="mb-6 space-y-2 text-gray-300">
          {lifeTimePlan?.features?.map((feature) => {
            return <FeatureLine title={feature} key={lifeTimePlan?.name + feature} />;
          })}
        </ul>
        <ButtonCheckout
          title="Get Started"
          priceId={lifeTimePlan?.priceId!}
          primaryClass="w-full rounded-lg border-2 border-white px-8 py-3 text-center text-sm font-semibold text-gray-100 outline-none transition duration-100 hover:bg-opacity-20 md:text-base"
        />
        <BorderBeam size={700} duration={10} delay={9} borderWidth={10} />
      </div>
      <h2 className=" mb-5 text-[30px] font-bold leading-[40px]">You can start with monthly and yearly plans also</h2>

      <div className="mx-auto flex w-full  flex-col items-center justify-center gap-6 md:flex-row ">
        {plans?.slice(1).map((plan) => {
          return (
            <div className={"z-1 relative mb-10 w-full rounded-lg bg-gray-900  p-6 sm:w-1/2 sm:p-8"} key={plan.priceId}>
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
                  primaryClass="block w-full rounded-lg border-2 border-white px-8 py-3 text-center text-sm font-semibold text-gray-100 outline-none transition duration-100 hover:bg-opacity-20 md:text-base"
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
