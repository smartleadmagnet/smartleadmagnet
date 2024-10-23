"use client";

import dynamic from "next/dynamic";

const isProd = process.env.NODE_ENV === "production";

const GoogleAnalytics = dynamic(() => import("./google-analytics"), {
  ssr: false,
});

const GoogleTagManager = dynamic(() => import("./google-tag-manager"), {
  ssr: false,
});

export const Index = () => {
  if (!isProd) {
    return null;
  }

  if (isProd && process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID) {
    return (
      <>
        <GoogleAnalytics />
        <GoogleTagManager />
      </>
    );
  }

  return null;
};

export default Index;
