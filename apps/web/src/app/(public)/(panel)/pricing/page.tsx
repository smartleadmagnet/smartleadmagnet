import React from "react";
import Pricing from "@/components/Pricing";
import getSeo from "@/lib/seo";

export function generateMetadata() {
  return getSeo(
    {
      title: "Pricing - SmartLeadMagnet",
      description:
        "Choose the plan that's right for you and start driving more traffic to your website with SmartLeadMagnet.",
    },
    "pricing"
  );
}

export const dynamic = "force-dynamic";

export default async function PricingPage() {
  return (
    <div className="relative mt-[-20px] overflow-hidden bg-white">
      <Pricing />;
      <div className="area">
        <ul className="circles">
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>
    </div>
  );
}
