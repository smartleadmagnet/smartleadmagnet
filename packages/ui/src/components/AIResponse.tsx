// import TextareaAutosize from "react-textarea-autosize";
"use client";

import { CheckIcon, CopyIcon, ReloadIcon, DownloadIcon } from "@radix-ui/react-icons";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { solarizedlight } from "react-syntax-highlighter/dist/esm/styles/prism";
import Loader from "./Loader";

import React from "react";

import { useCopyToClipboard } from "@/hooks/useCopyToClipboard";
import MarkdownTypingEffect from "./MarkdownTypingEffect";
import { Button } from "./ui/button";

const AIResponse = ({
  response,
  onRegenerate,
  type = "text",
  isLoading,
  handleBack,
}: {
  response: string;
  onRegenerate?: any;
  type?: string;
  isLoading?: boolean;
  handleBack: () => void;
}) => {
  const [copy, isCopied] = useCopyToClipboard();

  const onCopy = async () => {
    if (type === "image") {
      const a = document.createElement("a");
      a.href = response;
      a.download = "image.png";
      a.target = "_blank";
      a.click();
      a.remove();
      return;
    }
    if (response) {
      await copy({ text: response, timeout: 5000 });
    }
  };

  return (
    <div className="card flex flex-1 justify-start space-y-4 rounded-lg p-2 py-4 align-middle sm:border-2 sm:border-gray-600 sm:p-3 ">
      <div className="card bg-base-200/70 flex h-full w-full flex-1 flex-col justify-between rounded-lg p-2 align-middle sm:p-4">
        {!isLoading ? (
          <div className="prompt-content-box">
            {(type === "text" || type === "markdown") && (
              <div className="markdown-body max-h-[450px] overflow-y-auto">
                <MarkdownTypingEffect text={response} />
              </div>
            )}
            {type === "image" && (
              <div className="text-center">
                <img src={response} alt="Content" className="h-auto max-w-full rounded-lg" />
              </div>
            )}
            {type === "code" && (
              <>
                <SyntaxHighlighter language="typescript" style={solarizedlight}>
                  {response}
                </SyntaxHighlighter>
              </>
            )}
            <Button
              onClick={() => {
                handleBack();
              }}
              type="button"
              className="back-to-form bg-cyan-500 hover:bg-cyan-600"
            >
              Back to form
            </Button>
            {onRegenerate && (
              <Button variant="outline" onClick={onRegenerate} className="reload-icon">
                <ReloadIcon className="size-4" />
              </Button>
            )}

            <Button onClick={() => onCopy()} className="bg-green-700 ">
              {type === "image" ? (
                <DownloadIcon className="size-4" />
              ) : (
                <>{isCopied ? <CheckIcon className="size-4" /> : <CopyIcon className="size-4" />}</>
              )}
            </Button>
          </div>
        ) : (
          <Loader type={type as "image" | "text" | "code" | "markdown"} />
        )}
      </div>
    </div>
  );
};

export default AIResponse;
