"use client";

import React from "react";

export type ButtonProps = {
  title?: string;
  primaryClass?: string;
  secondaryClass?: string;
  priceId: string;
};

export default function ButtonCheckout({ primaryClass = "rounded-2xl max-w-[200px]", priceId, title }: ButtonProps) {
  return (
    // @ts-ignore
    <a href={`/api/payment/link?price_id=${priceId}&referer=${window?.promotekit_referral}`} className={primaryClass!}>
      {title}
    </a>
  );
}
