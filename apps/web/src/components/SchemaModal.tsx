"use client";
import { Dialog, DialogContent, DialogHeader } from "@smartleadmagnet/ui/components/ui/dialog";
import { CopyIcon, CheckIcon } from "lucide-react"; // Icons from lucide-react
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/cjs/styles/prism"; // You can choose different themes if you prefer
import { useCopyToClipboard } from "@/hooks/useCopyToClipboard";
import Link from "next/link";

// Props type for the modal
interface ViewPayloadModalProps {
  payload: any;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const ViewPayloadModal: React.FC<ViewPayloadModalProps> = ({ payload, isOpen, setIsOpen }) => {
  const [copy, isCopied] = useCopyToClipboard();

  const onClose = () => setIsOpen(false);

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="magent-dialog">
          <DialogHeader>
            <div className="mb-6 text-center">
              <div className="modal-header cm-modal-header">
                <h2 className="text-2xl font-semibold">Your API schema</h2>
              </div>
            </div>
            <p>
              Pass this in your api request body you need an api key from leadMagnet{" "}
              <Link href="/settings/manage-keys" target="_blank" className="text-blue-500">
                Get API key
              </Link>{" "}
              check the{" "}
              <Link href="/integrations/smartlead-magnet-api" target="_blank" className="text-blue-500">
                documentation
              </Link>{" "}
              for more details
            </p>
          </DialogHeader>

          {/* JSON Payload view */}
          <div className="relative mx-auto block">
            <p className="font-bold">Request body</p>
            <div className="relative mx-auto block">
              <button
                onClick={() => copy({ text: JSON.stringify(payload, null, 2) })}
                className="absolute right-0 top-[-7px] mt-2 rounded bg-green-500 p-2 text-white hover:bg-green-600"
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
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ViewPayloadModal;
