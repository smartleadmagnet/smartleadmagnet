"use client";

import React from "react";
import toast from "react-hot-toast";
import Alert, { AlertType } from "@/components/Alerts";

type CopyOptions = {
  text: string;
  timeout?: number;
  successMessage?: React.ReactNode;
  errorMessage?: React.ReactNode;
};

export const useCopyToClipboard = (): [(options: CopyOptions) => Promise<void>, boolean] => {
  const [isCopied, setIsCopied] = React.useState(false);

  const copy = async ({ text, timeout }: CopyOptions) => {
    if (isCopied) return;

    if (!navigator?.clipboard) {
      toast.custom(
        <Alert
          type={AlertType.Error}
          content="Unable to access clipboard. Please grant permission to enable clipboard access."
        />
      );
      return;
    }

    try {
      await navigator.clipboard.writeText(text);
      setIsCopied(true);
      toast.custom(<Alert type={AlertType.Success} content="Copied to clipboard!." />);
      setTimeout(() => {
        setIsCopied(false);
      }, timeout ?? 2000);
    } catch {
      toast.custom(<Alert type={AlertType.Error} content="Unable to copy to clipboard. Please try again" />);
    }
  };

  return [copy, isCopied];
};
