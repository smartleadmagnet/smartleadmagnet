// DeleteDialog.tsx

import React from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface DeleteDialogProps {
  isOpen: boolean;
  title: string;
  message: string;
  onClose: () => void;
  onConfirm: () => Promise<void>;
}

const DeleteDialog: React.FC<DeleteDialogProps> = ({
  isOpen,
  title,
  message,
  onClose,
  onConfirm,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="mx-auto max-w-lg">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <div>{message}</div>
          <DialogClose onClick={onClose} />
        </DialogHeader>
        
        <DialogFooter>
          <form onSubmit={(e) => { e.preventDefault(); onConfirm(); }}>
            <Button type="submit" className="mr-2 bg-red-600 hover:bg-red-900" >
              Delete
            </Button>
            <Button type="button" onClick={onClose} className="bg-cyan-600 hover:bg-cyan-900">
              Cancel
            </Button>
          </form>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteDialog;
