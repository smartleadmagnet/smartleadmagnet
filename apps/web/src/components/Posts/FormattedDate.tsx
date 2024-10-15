"use client";

import * as React from "react";
import { useFormattedDate } from "@/hooks/useFormattedDate";

export default function FormattedDate({ date }: { date: Date | string }) {
  const formattedDate = useFormattedDate(date, {
    format: "MMMM dd, yyyy",
    loading: "--",
  });
  return <div className="flex items-center justify-between gap-2 px-2 pt-4 text-sm">{formattedDate}</div>;
}
