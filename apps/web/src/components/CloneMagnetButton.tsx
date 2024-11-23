"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@smartleadmagnet/ui/components/ui/button";
import { CopyIcon, Loader2 } from "lucide-react";
import { toast } from "@smartleadmagnet/ui/hooks/use-toast";

interface CloneMagnetButtonProps {
  leadMagnetId: string;
}

export default function CloneMagnetButton({ leadMagnetId }: CloneMagnetButtonProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleClone = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/lead/clone", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ templateId: leadMagnetId }),
      });

      const data = await response.json();

      if (!data.isLoggedIn) {
        // Redirect to sign in if not logged in
        router.push("/login");
        return;
      }

      if (!response.ok) {
        throw new Error(data.error || "Failed to clone template");
      }

      toast({
        title: "Template cloned successfully!",
        description: "You can now edit and customize your cloned template.",
      });
      // Redirect to the edit page of the cloned lead magnet
      router.push(`/builder/${data.lead.id}`);
    } catch (error) {
      toast({
        title: "Failed to clone template",
        description: "Please try again later.",
      });
      console.error("Error cloning template:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button onClick={handleClone} disabled={isLoading} variant="outline">
      {isLoading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Cloning...
        </>
      ) : (
        <>
          <CopyIcon className="mr-2 h-4 w-4" />
          Make it yours
        </>
      )}
    </Button>
  );
}
