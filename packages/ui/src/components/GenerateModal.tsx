import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTrigger } from "./ui/dialog";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import React, { useState } from "react";
import { Loader2 } from "lucide-react";
import { ImMagicWand } from "react-icons/im";
import ConfirmDialog from "./ConfirmDialog";

export function GenerateModal({ onGenerate }: { onGenerate: Function }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isConfirm, setIsConfirm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [description, setDescription] = useState("");

  const handleCancel = () => {
    setIsOpen(false);
    setIsConfirm(false);
  };
  const handleConfirm = () => {
    setIsConfirm(true);
  };

  const handleGenerate = async () => {
    if (description) {
      setSubmitting(true);
      await onGenerate(description);
      setSubmitting(false);
      setIsOpen(false);
      setIsConfirm(false);
    }
  };

  return (
    <>
      <ConfirmDialog
        isOpen={!isConfirm && isOpen}
        onClose={() => setIsOpen(false)}
        onConfirm={handleConfirm}
        title="Are you absolutely sure?"
        message="This action cannot be undone. This will ovewrite all your last saved changes."
      />
      <Dialog open={isOpen && isConfirm} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button
            onClick={() => setIsOpen(true)}
            className="btn btn-primary relative flex items-center px-4 py-2 hover:bg-cyan-600"
          >
            <ImMagicWand className="h-6 w-6" />
            <span className="mx-2">Generate tool with AI</span>
          </Button>
        </DialogTrigger>
        <DialogContent className="magent-dialog">
          <DialogHeader>
            <div className="mb-6 text-center">
              <div className="modal-header cm-modal-header">
                <h2 className="text-2xl font-semibold">Generate Lead</h2>
              </div>
            </div>
            <DialogDescription>Enter your text below and click generate to proceed.</DialogDescription>
          </DialogHeader>
          <Textarea
            placeholder="I wanted to a lead magnet for the coloring book app..."
            onChange={(e) => setDescription(e.target.value)}
          />
          <DialogFooter>
            <Button onClick={handleGenerate} disabled={submitting} className="bg-cyan-500 ">
              {submitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              <span>Generate</span>
            </Button>
            <Button
              className="border border-cyan-500 bg-white text-cyan-500 hover:bg-cyan-600 hover:text-white"
              onClick={handleCancel}
            >
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
