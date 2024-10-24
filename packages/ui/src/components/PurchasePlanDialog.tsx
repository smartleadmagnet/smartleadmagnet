import React from "react";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";

interface PurchasePlanDialogProps {
  isOpen: boolean;
  onClose: () => void;
  creditRequired: boolean;
  paymentRequired: boolean;
}

const PurchasePlanDialog: React.FC<PurchasePlanDialogProps> = ({
  isOpen,
  onClose,
  creditRequired,
  paymentRequired,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="mx-auto max-w-lg">
        <DialogHeader>
          <DialogTitle>Upgrade Required</DialogTitle>
          <div>
            {creditRequired
              ? "You need more credits to publish this lead magnet."
              : "You need to upgrade your plan to access this feature."}
          </div>
          <DialogClose onClick={onClose} />
        </DialogHeader>

        <DialogFooter>
          {creditRequired && (
            <a href="/buy-credits">
              <Button type="button" className="btn-primary mr-2">
                Buy Credits
              </Button>
            </a>
          )}
          {paymentRequired && (
            <a href="/pricing">
              <Button type="button" className="btn-primary mr-2">
                Upgrade Plan
              </Button>
            </a>
          )}
          <Button type="button" onClick={onClose} className="bg-gray-600 hover:bg-gray-700">
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PurchasePlanDialog;
