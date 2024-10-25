"use client";

import React, { useState } from 'react';
import { cloneLead } from "@/actions/lead-magnet";
import { redirect, useRouter } from "next/navigation";
import { Button } from '@smartleadmagnet/ui/components/ui/button';
import { CopyIcon } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@smartleadmagnet/ui/components/ui/dialog";

interface CloneMagnetButtonProps {
  leadMagnetId: string;
  userId?: string;
}

export default function CloneMagnetButton({ leadMagnetId, userId }: CloneMagnetButtonProps) {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const onClone = async () => {
    if (userId) {
      const lead = await cloneLead(leadMagnetId);
      router.push(`/builder/${lead?.id!}`);
    } else {
      router.push('/login');
    }
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button 
          className="flex items-center rounded border border-cyan-500 px-4 py-2 text-cyan-500 bg-white"
        >
          <CopyIcon className="mr-2 h-4 w-4" />
          Make it yours
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{userId ? "Clone Lead Magnet" : "Login to Clone"}</DialogTitle>
          <DialogDescription>
            {
              userId ?
              "Are you sure you want to clone this lead magnet? You'll be able to edit and customize it." :
              "You'll need to login to clone this lead magnet."
            }
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={onClone}>{userId ? "Clone" : "Login"}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
