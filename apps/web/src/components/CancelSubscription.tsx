"use client";

import React, { useState } from "react";
import DeleteDialog from "@smartleadmagnet/ui/components/DeleteDialog";
import { Trash } from "lucide-react";
import { Button } from "@smartleadmagnet/ui/components/ui/button";
import { cancelSubscription } from "@/actions/stripe";

export default function CancelSubscription({ id }: { id: string }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const onSubmit = async () => {
    await cancelSubscription(id);
    closeModal();
  };

  return (
    <>
      <div className="flex justify-end">
        <Button
          onClick={openModal}
          variant="destructive"
          className="flex items-center space-x-1 bg-red-600 text-white hover:bg-red-900 hover:text-white"
        >
          <Trash className="h-4 w-4" />
          <span>Cancel Subscription</span>
        </Button>
      </div>
      <DeleteDialog
        isOpen={isModalOpen}
        title="Are you want to cancel this subscription?"
        message=""
        onClose={closeModal}
        onConfirm={onSubmit}
        deleteTitle="Yes"
        cancelTitle="No"
      />
    </>
  );
}
