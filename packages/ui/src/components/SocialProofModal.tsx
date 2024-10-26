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
    toast.custom((t) => (
      <div className="bg-white rounded-lg shadow-lg p-6 w-96" style={{ display: 'flex', alignItems: 'center', gap: '4' }}>
        <img src="/logo-short.png" alt="SmartLeadMagnet Logo" className="w-16 h-16" />
        <div className="flex flex-col gap-1 ml-4">
          <p className="text-gray-700 font-medium">{`SmartLeadMagnet published in ${country}`}</p>
          <p className="text-gray-500 text-sm">{`${hoursAgo} hours ago`}</p>
        </div>
      </div>
    ), {
      position: "bottom-left"
    });
  };

const SocialProofModal = () => {
  useEffect(() => {
    const timeoutId = setTimeout(() => {
        console.log("showToast")
        showToast()
      }, 3000);

      return () => clearTimeout(timeoutId);
  }, []);
  return <div />;
};

export default SocialProofModal;
