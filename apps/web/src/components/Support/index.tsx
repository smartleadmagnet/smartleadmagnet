import dynamic from "next/dynamic";
import React from "react";

const isProd = process.env.NODE_ENV === "production";

const Crisp = dynamic(() => import("./crisp"), {
  ssr: false,
});

export const Index = () => {
  if (!isProd) {
    return null;
  }

  if (isProd && process.env.NEXT_PUBLIC_CRISP_ID) {
    return <Crisp />;
  }

  return null;
};

export default Index;
