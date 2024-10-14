// import TextareaAutosize from "react-textarea-autosize";
import { CheckIcon, CopyIcon, ReloadIcon } from "@radix-ui/react-icons";
import React from "react";

import { useCopyToClipboard } from "@/hooks/useCopyToClipboard";
import MarkdownTypingEffect from "@/components/MarkdownTypingEffect";
import { Button } from "@/components/ui/button";

const AIResponse = ({
  response,
  onRegenerate,
  type = "text",
}: {
  response: string;
  onRegenerate: any;
  type?: string;
}) => {
  const [copy, isCopied] = useCopyToClipboard();

  const onCopy = async () => {
    if (response) {
      await copy({ text: response, timeout: 5000 });
    }
  };
  return (
    <div className="card flex flex-1 justify-start space-y-4 rounded-lg p-2 py-4 align-middle sm:border-2 sm:border-gray-600 sm:p-3 ">
      <div className="card bg-base-200/70 flex h-full w-full flex-1 flex-col justify-between rounded-lg p-2 align-middle sm:p-4">
        <div className="relative flex h-full flex-1 cursor-pointer space-x-2 rounded-md border-gray-500 p-2">
          {type === "text" && (
            <div className=" markdown-body max-h-[450px] overflow-y-auto p-4 pr-16 sm:pr-12  ">
              <MarkdownTypingEffect text={response} />
            </div>
          )}
          {type === "image" && (
            <div className="text-center">
              <img src={response} alt="Content" className="h-auto max-w-full rounded-lg" />
            </div>
          )}
          <div className="absolute right-0 top-0">
            <div className="flex flex-row gap-2">
              <Button variant="outline" onClick={onRegenerate}>
                <ReloadIcon className="size-4" />
              </Button>
              <Button onClick={() => onCopy()}>
                {isCopied ? <CheckIcon className="size-4" /> : <CopyIcon className="size-4" />}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIResponse;
