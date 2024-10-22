"use client";

import { CheckIcon, CommitIcon, CopyIcon, FileIcon, CodeIcon } from "@radix-ui/react-icons";
import classNames from "classnames";
import * as React from "react";
// @ts-ignore
import { useCopyToClipboard } from "@/hooks/useCopyToClipboard";

type PreProps = {
  "data-lang"?: string;
} & React.ComponentPropsWithoutRef<"pre">;
type CopyButtonProps = {
  text: string;
} & any;

const getLanguageIcon = (lang: string): React.ReactNode => {
  switch (lang) {
    case "js": {
      return <CodeIcon />;
    }

    case "ts": {
      return <CodeIcon />;
    }

    case "jsx":
    case "tsx": {
      return <CodeIcon />;
    }

    case "bash":
    case "sh":
    case "shell":
    case "zsh": {
      return <CommitIcon className="size-3.5" />;
    }

    default: {
      return <FileIcon className="size-3.5" />;
    }
  }
};

const Pre = (props: PreProps) => {
  const { children, className, title, "data-lang": lang, ...rest } = props;

  const textInput = React.useRef<HTMLPreElement>(null);
  const [text, setText] = React.useState<string>("");

  React.useEffect(() => {
    if (textInput.current) {
      setText(textInput.current.textContent ?? "");
    }
  }, []);

  return (
    <div className="w-full max-w-full">
      <figure className="not-prose bg-neutral group relative my-6 rounded-lg p-2 text-white">
        {title ? (
          <div className="flex flex-row items-center border-b px-4 py-1.5">
            {lang && <div className="text-muted-foreground">{getLanguageIcon(lang)}</div>}
            <figcaption className="flex-1 truncate text-white">{title}</figcaption>
            <CopyButton text={text} />
          </div>
        ) : (
          <CopyButton className="absolute right-4 top-3 z-10" text={text} />
        )}
        <div className="mt-10">
          <span ref={textInput} className={classNames("overflow-x-auto px-4 py-4", className)} {...rest}>
            {children}
          </span>
        </div>
      </figure>
    </div>
  );
};

const CopyButton = (props: CopyButtonProps) => {
  const { text, className, ...rest } = props;
  const [copy, isCopied] = useCopyToClipboard();

  return (
    <button
      className={classNames(
        "btn btn-outline btn-sm border-2 border-gray-500 text-white hover:border-gray-500",
        className
      )}
      onClick={() => copy({ text })}
      type="button"
      aria-label="Copy code to clipboard"
      {...rest}
    >
      {isCopied ? <CheckIcon className="size-4" /> : <CopyIcon className="size-4" />}
    </button>
  );
};

export default Pre;
