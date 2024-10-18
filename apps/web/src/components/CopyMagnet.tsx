"use client";
import React, { useState } from "react";
import {  CopyIcon } from "lucide-react";
import { redirect } from "next/navigation";

export default function CopyMagnet({ id,onClone }: { id: string,onClone:()=>void }) {
  

  return (
    <>
        <button onClick={onClone} className="flex items-center p-1 hover:bg-gray-100">
            <CopyIcon className="pl-1 mr-2 h-4 w-4" />
            Clone Magnet
        </button>
    </>
  );
}
