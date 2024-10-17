"use client";

import { useFormStatus } from "react-dom";
import React from "react";
export default function FormComponent({
  title = "Approve",
  className = "btn-secondary",
  disabled = false,
}: {
  title?: string;
  className?: string;
  disabled?: boolean;
}) {
  const { pending } = useFormStatus();
  return (
    <button className={className} type="submit" disabled={disabled || pending}>
      {pending && <span className="loading loading-spinner loading-md"></span>}
      {!pending && title}
    </button>
  );
}
