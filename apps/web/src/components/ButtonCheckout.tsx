import React from "react";

export type ButtonProps = {
  title?: string;
  primaryClass?: string;
  secondaryClass?: string;
  priceId: string;
};

export default function ButtonCheckout({ primaryClass = "rounded-2xl max-w-[200px]", priceId, title }: ButtonProps) {
  return (
    <a href={`/api/payment/link?price_id=${priceId}`} className={primaryClass!}>
      {title}
    </a>
  );
}
