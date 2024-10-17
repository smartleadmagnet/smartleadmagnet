// Define the PricingPlan type
import { PlanTier } from "@/lib/types";

export type PricingPlan = {
  name: string;
  originalPrice: number;
  discountPrice: number;
  credits: number;
  currency: string;
  isSubscription: boolean;
  description?: string;
  planTier: PlanTier; // For one-time or lifetime, this could be "one-time" or "lifetime"
  features: string[];
  priceId: string;
};

// Define the IPricing type
export interface IPricing {
  title: string;
  description: string;
  defaultCurrency: string;
  plans: PricingPlan[];
}

// Example pricing configuration object with discounted prices
const pricingConfig: IPricing = {
  title: "SmartLeadMagnet Pricing",
  description: "Choose the best plan to start creating high-converting lead magnets with AI.",
  defaultCurrency: "USD",
  plans: [
    {
      name: "One-Time Plan",
      originalPrice: 199,
      discountPrice: 99, // Discounted price
      credits: 100,
      currency: "USD",
      isSubscription: false,
      description: "One-time payment with 100 AI credits, valid for 1 year.",
      planTier: PlanTier.ONE_TIME,
      features: ["100 AI Credits", "Valid for 1 Year", "Access to Lead Magnet Builder", "AI-Powered Personalization"],
      priceId: process.env.STRIPE_SMARTLEADMAGNET_ONE_TIME!,
    },
    {
      name: "Lifetime Plan",
      originalPrice: 299,
      discountPrice: 119, // Discounted price
      credits: 250,
      currency: "USD",
      isSubscription: false,
      description: "Lifetime access with 250 AI credits.",
      planTier: PlanTier.LIFE_TIME,
      features: ["250 AI Credits", "Lifetime Access", "Unlimited Lead Magnets", "AI-Powered Personalization"],
      priceId: process.env.STRIPE_SMARTLEADMAGNET_LIFE_TIME!,
    },
    {
      name: "Monthly Subscription",
      originalPrice: 79,
      discountPrice: 49, // Discounted price
      credits: 250,
      currency: "USD",
      isSubscription: true,
      planTier: PlanTier.SUBSCRIPTION,
      description: "Monthly subscription with 250 AI credits.",
      features: [
        "250 AI Credits per month",
        "Ongoing Access to AI Features",
        "Monthly Lead Magnet Creation",
        "AI-Powered Personalization",
      ],
      priceId: process.env.STRIPE_SMARTLEADMAGNET_MONTHLY_SUBSCRIPTION!,
    },
  ],
};

export default pricingConfig;
