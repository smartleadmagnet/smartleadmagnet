import React from "react";

import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";

interface ConfirmationDialogProps {
  isOpen: boolean;
  title: string;
  message: string;
  onClose: () => void;
  onConfirm: () => void;
  confirmTitle?: string;
  cancelTitle?: string;
}

const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
  isOpen,
  title,
  message,
  onClose,
  onConfirm,
  confirmTitle = "Confirm",
  cancelTitle = "Cancel",
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="mx-auto max-w-lg">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <div className="text-muted-foreground text-sm">{message}</div>
        </DialogHeader>

        <DialogClose onClick={onClose} />
        <DialogFooter>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              onConfirm();
            }}
          >
            <Button type="submit" className="mr-2 bg-cyan-500 hover:bg-cyan-600">
              {confirmTitle}
            </Button>
            <Button
              type="button"
              onClick={onClose}
              className="border border-cyan-500 bg-white text-cyan-500 hover:bg-cyan-600 hover:text-white"
            >
              {cancelTitle}
            </Button>
          </form>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmationDialog;
