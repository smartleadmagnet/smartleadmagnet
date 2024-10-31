"use client";

import { Button } from "@smartleadmagnet/ui/components/ui/button";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Spinner from "@smartleadmagnet/ui/components/Spinner";
import { toast } from "@smartleadmagnet/ui/hooks/use-toast";

export default function BuildNewMagnet({
  title,
  className,
  size = "sm",
}: {
  title: string;
  className?: string;
  size?: string;
}) {
  const [creatingLead, setCreatingLead] = useState(false);
  const router = useRouter();
  const onCreate = async () => {
    setCreatingLead(true);
    try {
      const response = await fetch("/api/lead", { method: "POST" }); // Update this endpoint
      // if the request fails, and error is 401 then redirect to login
      if (!response.ok) {
        if (response.status === 401) {
          router.push("/login");
          return;
        }
        throw new Error("Failed to create lead");
      }
      const lead = await response.json();
      router.push(`/builder/${lead.id}`);
    } catch (error) {
      toast({
        title: "Error creating magnet",
        description: "An error occurred while creating the magnet. Please try again.",
        variant: "destructive",
      });
    }
    setCreatingLead(false);
  };

  return (
    <Button
      onClick={onCreate}
      variant="outline"
      size={size as any}
      className={`btn-primary flex max-w-[220px] flex-row rounded-2xl ${className}`}
      disabled={creatingLead}
    >
      {creatingLead && <Spinner className="h-5 w-5 animate-spin" aria-hidden="true" />}
      {creatingLead ? "Creating Magnet..." : title}
    </Button>
  );
}
