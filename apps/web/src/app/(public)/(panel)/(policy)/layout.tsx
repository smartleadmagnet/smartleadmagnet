import { unstable_setRequestLocale } from "next-intl/server";
import React from "react";

export default function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);
  return (
    <div className="flex min-h-screen w-full flex-col pb-10" >
      <div className="mx-auto flex size-full max-w-7xl grow flex-col">{children}</div>
    </div>
  );
}
