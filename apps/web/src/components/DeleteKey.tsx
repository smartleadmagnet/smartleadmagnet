"use client";

import React, { useState } from "react";
import DeleteDialog from "@smartleadmagnet/ui/components/DeleteDialog";
import { Trash } from "lucide-react";
import { deleteKey } from "@/actions/api-keys";
import { Button } from "@smartleadmagnet/ui/components/ui/button";

export default function DeleteKey({ id }: { id: string }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const onSubmit = async () => {
    await deleteKey(id);
    closeModal();
  };

  return (
    <>
      <div className="flex justify-end">
        <Button onClick={openModal} variant="outline" size="sm" className="flex items-center space-x-1 bg-red-600 text-white hover:bg-red-900 hover:text-white">
          <Trash className="h-4 w-4" />
          <span>Delete</span>
        </Button>
      </div>
      <DeleteDialog
        isOpen={isModalOpen}
        title="Are you sure you want to delete this key?"
        message="This action cannot be undone."
        onClose={closeModal}
        onConfirm={onSubmit}
      />
    </>
  );
}
