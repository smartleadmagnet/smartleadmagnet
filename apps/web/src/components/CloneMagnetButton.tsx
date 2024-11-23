"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@smartleadmagnet/ui/components/ui/button";
import { CopyIcon, Loader2 } from "lucide-react";
import { toast } from "@smartleadmagnet/ui/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@smartleadmagnet/ui/components/ui/dialog";

interface CloneMagnetButtonProps {
  leadMagnetId: string;
  overrideClasses?: string;
}

export default function CloneMagnetButton({ leadMagnetId }: CloneMagnetButtonProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showLoginDialog, setShowLoginDialog] = useState(false);

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

      if (response.status === 401 || !data.isLoggedIn) {
        setShowLoginDialog(true);
        return;
      }

      if (!response.ok) {
        throw new Error(data.error || "Failed to clone template");
      }

      toast({
        title: "Template cloned successfully!",
        description: "You can now edit and customize your cloned template.",
      });
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

  const handleLoginRedirect = () => {
    setShowLoginDialog(false);
    router.push("/login");
  };

  return (
    <>
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

      <Dialog open={showLoginDialog} onOpenChange={setShowLoginDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Login Required</DialogTitle>
            <DialogDescription>
              You need to be logged in to clone this template. After logging in, return to this page
              and click the &quot;Make it yours&quot; button again to create your copy.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end">
            <Button onClick={handleLoginRedirect}>
              Go to Login
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
