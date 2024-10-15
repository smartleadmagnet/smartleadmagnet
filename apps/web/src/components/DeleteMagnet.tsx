"use client";

import React, { useState } from "react";
import DeleteDialog from "@smartleadmagnet/ui/components/DeleteDialog";
import {  Trash2 } from "lucide-react";
import { deleteLead } from "@/actions/lead-magnet";
import { Button } from "@smartleadmagnet/ui/components/ui/button";

export default function DeleteKey({ id }: { id: string }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const onSubmit = async () => {
    await deleteLead(id);
    closeModal();
  };

  return (
    <>
      
        <button onClick={openModal} className="flex items-center p-1 hover:bg-gray-100 text-red-600">
            <Trash2 className="mr-2 h-4 w-4" />
            Delete
        </button>
      
      <DeleteDialog
        isOpen={isModalOpen}
        title="Are you sure you want to delete this magnet?"
        message="This action cannot be undone."
        onClose={closeModal}
        onConfirm={onSubmit}
      />
    </>
  );
}
