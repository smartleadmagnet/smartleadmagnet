"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@smartleadmagnet/ui/components/ui/dialog";
import { Button } from "@smartleadmagnet/ui/components/ui/button";
import { CopyIcon, CheckIcon } from "lucide-react"; // Icons from lucide-react
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/cjs/styles/prism"; // You can choose different themes if you prefer
import { useCopyToClipboard } from "@/hooks/useCopyToClipboard";

// Props type for the modal
interface ViewPayloadModalProps {
  payload: any;
}

const ViewPayloadModal: React.FC<ViewPayloadModalProps> = ({ payload }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [copy, isCopied] = useCopyToClipboard();

  const onClose = () => setIsOpen(false);

  return (
    <>
      <Button className="btn-primary" onClick={() => setIsOpen(true)}>
        View Payload
      </Button>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="magent-dialog">
          <DialogHeader>
            <div className="mb-6 text-center">
              <div className="modal-header cm-modal-header">
                <h2 className="text-2xl font-semibold">Payload</h2>
              </div>
            </div>
          </DialogHeader>

          {/* JSON Payload view */}
          <div className="relative mx-auto block">
            <button
              onClick={() => copy({ text: JSON.stringify(payload, null, 2) })}
              className="absolute right-0 mt-2 rounded bg-green-500 p-2 text-white hover:bg-green-600"
            >
              {isCopied ? <CheckIcon className="h-5 w-5" /> : <CopyIcon className="h-5 w-5" />}
            </button>

            {/* SyntaxHighlighter for JSON payload */}
            <SyntaxHighlighter
              language="json"
              style={vscDarkPlus}
              className="max-w-[460px] overflow-x-auto rounded-md bg-gray-100 p-4 text-sm"
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
