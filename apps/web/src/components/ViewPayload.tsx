"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@smartleadmagnet/ui/components/ui/dialog";
import { Button } from "@smartleadmagnet/ui/components/ui/button";
import { CopyIcon } from "lucide-react"; // Icons from lucide-react
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/cjs/styles/prism"; // You can choose different themes if you prefer

// Props type for the modal
interface ViewPayloadModalProps {
  payload: any;
}

const ViewPayloadModal: React.FC<ViewPayloadModalProps> = ({ payload }) => {
  const [isOpen, setIsOpen] = useState(false);

  const onClose = () => setIsOpen(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(JSON.stringify(payload, null, 2)).then(
      () => {
        alert("Content copied to clipboard!");
      },
      (err) => {
        console.error("Error copying content: ", err);
      }
    );
  };

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>View Payload</Button>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Payload</DialogTitle>
          </DialogHeader>

          {/* JSON Payload view */}
          <div className="relative block mx-auto">
            <button
              onClick={copyToClipboard}
              className="mt-2 rounded bg-blue-500 p-2 text-white hover:bg-blue-600 absolute right-0"
            >
              <CopyIcon className="h-5 w-5" />
            </button>

            {/* SyntaxHighlighter for JSON payload */}
            <SyntaxHighlighter
              language="json"
              style={vscDarkPlus}
              className="bg-gray-100 p-4 rounded-md overflow-x-auto text-sm max-w-[460px]"
            >
              {payload ? JSON.stringify(payload, null, 2) : "No Payload Data"}
            </SyntaxHighlighter>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ViewPayloadModal;
