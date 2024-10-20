import React, { useState } from "react";
import { Input } from "@smartleadmagnet/ui/components/ui/input";
import { Button } from "@smartleadmagnet/ui/components/ui/button";
import { CheckIcon, CopyIcon, Eye, EyeOff, RefreshCw } from "lucide-react"; // Importing icons from lucide-react
import { useCopyToClipboard } from "@/hooks/useCopyToClipboard.tsx";
import Spinner from "@smartleadmagnet/ui/components/Spinner";

interface SecretKeyManagerProps {
  secretKey: string;
  generateNewSecretKey: () => void;
  loading: boolean;
}

export default function SecretKeyManager({ secretKey, generateNewSecretKey, loading }: SecretKeyManagerProps) {
  const [isKeyVisible, setIsKeyVisible] = useState(false);
  const [copy, isCopied] = useCopyToClipboard();

  return (
    <div className="space-y-4 rounded border bg-white p-4">
      <div className="flex w-full max-w-sm items-center space-x-2">
        <Input
          type={isKeyVisible ? "text" : "password"}
          value={secretKey}
          readOnly
          className="min-w-[300px]"
          placeholder="Your secret key will appear here"
        />
        <Button onClick={generateNewSecretKey} className="btn-primary flex items-center space-x-2">
          {!loading && (
            <>
              <RefreshCw className="h-4 w-4" /> {/* Icon for 'Generate New' */}
              <span>Generate New</span>
            </>
          )}
          {loading && <Spinner />}
        </Button>
      </div>

      <div className="flex space-x-4">
        <Button onClick={() => setIsKeyVisible(!isKeyVisible)} className="flex items-center space-x-2">
          {isKeyVisible ? (
            <>
              <EyeOff className="h-4 w-4" /> {/* Icon for 'Hide' */}
              <span>Hide</span>
            </>
          ) : (
            <>
              <Eye className="h-4 w-4" /> {/* Icon for 'Show' */}
              <span>Show</span>
            </>
          )}
        </Button>

        <Button
          onClick={() => {
            copy({ text: secretKey });
          }}
          className="flex items-center space-x-2 bg-green-500 text-white hover:bg-green-600"
        >
          {isCopied ? <CheckIcon className="h-5 w-5" /> : <CopyIcon className="h-5 w-5" />}
          <span>Copy</span>
        </Button>
      </div>
    </div>
  );
}
