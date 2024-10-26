"use client";

import { Crisp } from "crisp-sdk-web";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

const CrispChat = () => {
  const searchParams = useSearchParams();
  const support = searchParams?.get("support");

  useEffect(() => {
    const crispPublicId = process.env.NEXT_PUBLIC_CRISP_ID;
    if (crispPublicId) {
      Crisp.configure(crispPublicId);
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
