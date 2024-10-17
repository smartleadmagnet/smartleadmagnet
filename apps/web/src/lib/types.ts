import React from "react";
// import Stripe from "stripe";

export type MDXFrontMatter = {
  slug: string;
  title: string;
  description?: string;
  date: string;
  tags?: Array<string>;
};

export enum LayoutType {
  Full = "full",
  Box = "box",
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

export enum PlanTier {
  ONE_TIME = "ONE_TIME",
  LIFE_TIME = "LIFE_TIME",
  SUBSCRIPTION = "SUBSCRIPTION",
}
