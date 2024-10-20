import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import React, { useState } from "react";
import Spinner from "./Spinner";

export function GenerateModal({ onGenerate }: { onGenerate: Function }) {
  const [isOpen, setIsOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [description, setDescription] = useState("");

  const handleCancel = () => {
    setIsOpen(false);
  };

  const handleGenerate = async () => {
    if (description) {
      setSubmitting(true);
      await onGenerate(description);
      setSubmitting(false);
      setIsOpen(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button onClick={() => setIsOpen(true)} className="btn btn-primary relative flex items-center px-4 py-2">
          <svg
            stroke="currentColor"
            fill="currentColor"
            strokeWidth="0"
            viewBox="0 0 24 24"
            className="text-lg"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Icon */}
            <path d="m11 4-.5-1-.5 1-1 .125.834.708L9.5 6l1-.666 1 .666-.334-1.167.834-.708zm8.334 10.666L18.5 13l-.834 1.666-1.666.209 1.389 1.181L16.834 18l1.666-1.111L20.166 18l-.555-1.944L21 14.875zM6.667 6.333 6 5l-.667 1.333L4 6.5l1.111.944L4.667 9 6 8.111 7.333 9l-.444-1.556L8 6.5zM3.414 17c0 .534.208 1.036.586 1.414L5.586 20c.378.378.88.586 1.414.586s1.036-.208 1.414-.586L20 8.414c.378-.378.586-.88.586-1.414S20.378 5.964 20 5.586L18.414 4c-.756-.756-2.072-.756-2.828 0L4 15.586c-.378.378-.586.88-.586 1.414zM17 5.414 18.586 7 15 10.586 13.414 9 17 5.414z"></path>
          </svg>
          <span className="mx-2">Generate tool with AI</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Generate Lead</DialogTitle>
          <DialogDescription>Enter your text below and click generate to proceed.</DialogDescription>
        </DialogHeader>
        <Textarea
          placeholder="I wanted to a lead magnet for the coloring book app..."
          onChange={(e) => setDescription(e.target.value)}
        />
        <DialogFooter>
          <Button variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
          <Button onClick={handleGenerate}>
            {submitting && <Spinner />}
            <span className="ml-4">Generate</span>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
