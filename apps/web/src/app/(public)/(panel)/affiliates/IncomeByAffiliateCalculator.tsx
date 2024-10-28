"use client";
import { useState } from "react";
import { getCurrentPrice, pricingPlans } from "@/lib/affiliate";
import { Slider } from "@smartleadmagnet/ui/components/ui/slider";

function IncomeByAffiliateProgramCalculator() {
  const basePrice: number = getCurrentPrice();

  const [noOfReferrals, setNoOfReferrals] = useState<number>(60);

  const totalEarnings: number = Math.floor(
    basePrice * noOfReferrals * pricingPlans.leadMagnets.affiliateCommission
  );

  return (
    <div className="">
      <div className="flex flex-col items-center">
      <h3 className="mb-3 max-w-3xl text-center text-2xl text-gray-900 dark:text-white">
        You could potentially earn{" "}
        <strong className="font-extrabold text-gray-900 dark:text-white">
          $<span>{totalEarnings}</span>
        </strong>{" "}
        with <span>{noOfReferrals}</span> users who purchase a plan through your referral links.
      </h3>
      <h4 className="my-3 mb-6 text-center text-gray-900 dark:text-white text-center">
        Use Calculator to check your potential Earning
      </h4>
      </div>
      <div className="text-center">
        <Slider
          min={0}
          max={200}
          value={[noOfReferrals]}
          onValueChange={(value: number[]) => {
            console.log(value);
            setNoOfReferrals(value?.[0] || 0);
          }}
          className="w-full mb-4"
        />
        <div className="mb-4 flex w-full justify-between px-2 text-xs text-gray-500 dark:text-gray-400">
          <span>0</span>
          <span>50</span>
          <span>100</span>
          <span>150</span>
          <span>200</span>
        </div>
      </div>

      <div className="my-8 text-center text-gray-900 dark:text-white">
        <p>
          The calculation is based on each user who purchases a plan through your referral link. The price is based on
          the Lifetime Plan.
        </p>
      </div>
    </div>
  );
}

export default IncomeByAffiliateProgramCalculator;
