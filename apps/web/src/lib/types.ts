import React from "react";
// import Stripe from "stripe";

export type MDXFrontMatter = {
  slug: string;
  title: string;
  description?: string;
  date: string;
  tags?: Array<string>;
};

export enum EmailProvider {
  SES = "ses",
  Mailgun = "mailgun",
  SendGrid = "sendgrid",
  ReSend = "resend",
  Brevo = "brevo",
}

export enum LayoutType {
  Full = "full",
  Box = "box",
}

export type OGTemplate = {
  id: string;
  title: string;
  date: string;
  image?: string;
};

export enum NavigationPositionType {
  CENTER = "center",
  LEFT = "left",
  RIGHT = "right",
}

export enum HeroDirectionType {
  LEFT = "left",
  RIGHT = "right",
}

export type FooterLink = {
  name: string;
  url?: string;
  item?: React.ReactNode;
};

export type FooterSection = {
  name: string;
  links: FooterLink[];
};

export type Question = {
  question: string;
  answer: any;
};

export type PricingPlan = {
  title?: string;
  description?: string;
  price: number;
  monthlyPrice?: number;
  features?: string[];
  cta: string;
  priceId: string;
  popular?: boolean;
  totalDiscount?: string;
  tier: "FREE" | "PREMIUM" | "ULTIMATE";
  duration: "MONTHLY" | "ANNUAL" | "DAILY";
};

export type NavigationItem = {
  name: string;
  link?: string;
  items?: NavigationItem[];
  className?: string;
  active?: boolean;
  action?: () => void;
};
