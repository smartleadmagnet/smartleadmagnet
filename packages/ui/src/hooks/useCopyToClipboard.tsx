"use client";

import React from "react";
import { useToast } from "@/hooks/use-toast";

type CopyOptions = {
  text: string;
  timeout?: number;
  successMessage?: React.ReactNode;
  errorMessage?: React.ReactNode;
};

export const useCopyToClipboard = (): [(options: CopyOptions) => Promise<void>, boolean] => {
  const [isCopied, setIsCopied] = React.useState(false);
  const { toast } = useToast();
  const copy = async ({ text, timeout }: CopyOptions) => {
    if (isCopied) return;

    if (!navigator?.clipboard) {
      toast({
        variant: "destructive",
        title: "Unable to access clipboard.",
        description: "Please grant permission to enable clipboard access.",
      });
      return;
    }

    try {
      await navigator.clipboard.writeText(text);
      setIsCopied(true);
      toast({
        title: "Copied to clipboard",
        description: "The content has been copied to the clipboard.",
      });
      setTimeout(() => {
        setIsCopied(false);
      }, timeout ?? 2000);
    } catch {
      toast({
        variant: "destructive",
        title: "Unable to copy to clipboard.",
        description: "Please try again.",
      });
    }
  };

  return [copy, isCopied];
};
