"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@smartleadmagnet/ui/components/ui/dialog";
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
      <div className="mb-4 flex justify-end">
        <Button onClick={openModal} variant="outline" size="sm" className="flex items-center space-x-1">
          <Trash className="h-4 w-4" />
          <span>Delete</span>
        </Button>
      </div>
      {isModalOpen && (
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent className="mx-auto max-w-lg">
            <DialogHeader>
              <DialogTitle>Add Key</DialogTitle>
              <DialogClose onClick={closeModal} />
            </DialogHeader>
            <div>Do you want to delete key ?</div>
            <DialogFooter>
              <form action={onSubmit} className="w-full">
                <Button type="submit" className="mr-5">
                  Yes
                </Button>
                <Button type="button" onClick={closeModal}>
                  No
                </Button>
              </form>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
