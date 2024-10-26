"use client";

import { Crisp } from "crisp-sdk-web";
import { useEffect } from "react";
import { Env } from "@/lib/Env.mjs";
import { useSearchParams } from "next/navigation";

const CrispChat = () => {
  const searchParams = useSearchParams();
  const support = searchParams?.get("support");

  useEffect(() => {
    if (Env.NEXT_PUBLIC_CRISP_ID) {
      Crisp.configure(Env.NEXT_PUBLIC_CRISP_ID);
      Crisp?.session?.onLoaded(() => {
        if (support) {
          window.$crisp.push(["do", "chat:open"]);
        }
      });
    }
  }, []);

  return null;
};

export default CrispChat;
