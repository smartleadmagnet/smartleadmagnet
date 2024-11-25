import React from "react";

import pricingConfig from "@/lib/config/pricingConfig";
import { PlanTier } from "@/lib/types";
import BuyCredit from "@/components/Pricing/BuyCredit";

export default async function Page() {
  const userPlans = pricingConfig.plans?.filter((plan) => plan.planTier === PlanTier.CREDIT);
  return (
    <div className="container my-10">
      <BuyCredit plans={userPlans} />
    </div>
  );
}
