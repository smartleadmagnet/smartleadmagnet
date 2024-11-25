"use client";

import { BuilderProvider } from "@/providers/BuilderProvider";
import BuilderElementPreview from "@/components/Share";
import React from "react";

export default function TemplatePreview({ leadMagnet }: { leadMagnet: any }) {
  return (
    <BuilderProvider leadMagnet={leadMagnet}>
      <BuilderElementPreview />
    </BuilderProvider>
  );
}
