"use client";

import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";

const countries = [
  "USA",
  "UK",
  "Canada",
  "Australia",
  "Germany",
  "France",
  "Spain",
  "Italy",
  "Brazil",
  "Japan",
  "China",
  "India",
];

const showToast = () => {
  const country = countries[Math.floor(Math.random() * countries.length)];
  const hoursAgo = Math.floor(Math.random() * (12 - 3 + 1)) + 3;
  toast.custom(
    (t) => (
      <div
        className="w-96 rounded-lg bg-white p-6 shadow-lg"
        style={{ display: "flex", alignItems: "center", gap: "4" }}
      >
        <img src="/logo-short.png" alt="SmartLeadMagnet Logo" className="h-16 w-16" />
        <div className="ml-4 flex flex-col gap-1">
          <p className="font-medium text-gray-700">{`SmartLeadMagnet published in ${country}`}</p>
          <p className="text-sm text-gray-500">{`${hoursAgo} hours ago`}</p>
        </div>
      </div>
    ),
    {
      position: "bottom-left",
    }
  );
};

const SocialProofModal = () => {
  useEffect(() => {
    if (process.env.NEXT_PUBLIC_ENABLE_TOAST_SOCIAL_PROOF) {
      const timeoutId = setTimeout(() => {
        showToast();
      }, 3000);

      return () => clearTimeout(timeoutId);
    }
  }, []);
  return <div />;
};

export default SocialProofModal;
