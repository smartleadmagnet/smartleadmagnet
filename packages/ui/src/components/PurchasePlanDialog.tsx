import React from "react";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";

interface PurchasePlanDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void>;
}

const PurchasePlanDialog: React.FC<PurchasePlanDialogProps> = ({ isOpen, onClose }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="mx-auto max-w-lg">
        <DialogHeader>
          <DialogTitle>Upgrade Required</DialogTitle>
          <div>You need more credits to publish this lead magnet. Please purchase a plan to proceed.</div>
          <DialogClose onClick={onClose} />
        </DialogHeader>

        <DialogFooter>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              onConfirm();
            }}
          >
            <Button type="submit" className="mr-2 bg-green-600 hover:bg-green-700">
              Buy Plan
            </Button>
            <Button type="button" onClick={onClose} className="bg-gray-600 hover:bg-gray-700">
              Cancel
            </Button>
          </form>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PurchasePlanDialog;
