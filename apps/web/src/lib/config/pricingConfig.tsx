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
  features: { name: string; hint: string }[]; // Changed feature to name and hint
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
  title: "Start Creating High-Converting Lead Magnets with AI",
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
      features: [
        {
          name: "Two dedicated social media promotion campaigns across major platforms once",
          hint: "Our marketing team will promote your product, sharing it on multiple social media channels.",
        },
        {
          name: "Guaranteed traffic boost of 3,000-6,000 visitors in the first month",
          hint: "Our marketing team will try to bring organic social media traffic to your website.",
        },
        { name: "100 AI Credits", hint: "You can buy extra credits later too." },
        { name: "Valid for 1 Year", hint: "" },
        { name: "Access to Lead Magnet Builder", hint: "" },
        { name: "AI-Powered Personalization", hint: "" },
      ],
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
      features: [
        {
          name: "Two dedicated social media promotion campaigns across major platforms once",
          hint: "Our marketing team will promote your product, sharing it on multiple social media channels.",
        },
        {
          name: "Guaranteed traffic boost of 3,000-6,000 visitors in the first month",
          hint: "Our marketing team will try to bring organic social media traffic to your website.",
        },
        { name: "250 AI Credits", hint: "You can buy extra credits later too." },
        { name: "Lifetime Access", hint: "" },
        { name: "Unlimited Lead Magnets", hint: "" },
        { name: "AI-Powered Personalization", hint: "" },
      ],
      priceId: process.env.STRIPE_SMARTLEADMAGNET_LIFE_TIME!,
    },
    {
      name: "Monthly Plan",
      originalPrice: 79,
      discountPrice: 49, // Discounted price
      credits: 250,
      currency: "USD",
      isSubscription: true,
      planTier: PlanTier.SUBSCRIPTION,
      description: "Monthly subscription with 250 AI credits.",
      features: [
        {
          name: "Two dedicated social media promotion campaigns across major platforms every month",
          hint: "Our marketing team will promote your product, sharing it on multiple social media channels.",
        },
        {
          name: "Guaranteed traffic boost of 3,000-6,000 visitors in the first month",
          hint: "Our marketing team will try to bring organic social media traffic to your website.",
        },
        { name: "250 AI Credits per month", hint: "You can buy extra credits later too." },
        { name: "Ongoing Access to AI Features", hint: "" },
        { name: "Monthly Lead Magnet Creation", hint: "" },
        { name: "AI-Powered Personalization", hint: "" },
      ],
      priceId: process.env.STRIPE_SMARTLEADMAGNET_MONTHLY_SUBSCRIPTION!,
    },
    {
      name: "Credit 250",
      originalPrice: 39,
      discountPrice: 20, // Discounted price
      credits: 250,
      currency: "USD",
      isSubscription: false,
      planTier: PlanTier.CREDIT,
      description: "250 AI credits.",
      features: [],
      priceId: process.env.STRIPE_SMARTLEADMAGNET_250_CREDIT!,
    },
    {
      name: "Credit 500",
      originalPrice: 59,
      discountPrice: 35, // Discounted price
      credits: 500,
      currency: "USD",
      isSubscription: false,
      planTier: PlanTier.CREDIT,
      description: "500 AI credits.",
      features: [],
      priceId: process.env.STRIPE_SMARTLEADMAGNET_500_CREDIT!,
    },
    {
      name: "Credit 750",
      originalPrice: 79,
      discountPrice: 45, // Discounted price
      credits: 750,
      currency: "USD",
      isSubscription: false,
      planTier: PlanTier.CREDIT,
      description: "750 AI credits.",
      features: [],
      priceId: process.env.STRIPE_SMARTLEADMAGNET_750_CREDIT!,
    },
    {
      name: "Credit 1000",
      originalPrice: 99,
      discountPrice: 52, // Discounted price
      credits: 1000,
      currency: "USD",
      isSubscription: false,
      planTier: PlanTier.CREDIT,
      description: "1000 AI credits.",
      features: [],
      priceId: process.env.STRIPE_SMARTLEADMAGNET_1000_CREDIT!,
    },
  ],
};

export default pricingConfig;
