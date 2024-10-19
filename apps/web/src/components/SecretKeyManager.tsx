import React, { useState } from "react";
import { Input } from "@smartleadmagnet/ui/components/ui/input";
import { Button } from "@smartleadmagnet/ui/components/ui/button";
import { Eye, EyeOff, CheckIcon,CopyIcon, RefreshCw } from "lucide-react";  // Importing icons from lucide-react
import { useCopyToClipboard } from "@/hooks/useCopyToClipboard.tsx";

interface SecretKeyManagerProps {
  secretKey: string;
  generateNewSecretKey: () => void;
}

export default function SecretKeyManager({ secretKey, generateNewSecretKey }: SecretKeyManagerProps) {
  const [isKeyVisible, setIsKeyVisible] = useState(false);
  const [copy, isCopied] = useCopyToClipboard();

  

  return (
    <div className="space-y-4 border p-4 bg-white rounded">
      <div className="flex w-full max-w-sm items-center space-x-2">
        <Input
          type={isKeyVisible ? "text" : "password"}
          value={secretKey}
          readOnly
          className="min-w-[300px]"
          placeholder="Your secret key will appear here"
        />
        <Button
          onClick={generateNewSecretKey}
          className="flex items-center space-x-2 btn-primary"
        >
          <RefreshCw className="w-4 h-4" />  {/* Icon for 'Generate New' */}
          <span>Generate New</span>
        </Button>
      </div>

      <div className="flex space-x-4">
        <Button
          onClick={() => setIsKeyVisible(!isKeyVisible)}
          className="flex items-center space-x-2"
        >
          {isKeyVisible ? (
            <>
              <EyeOff className="w-4 h-4" />  {/* Icon for 'Hide' */}
              <span>Hide</span>
            </>
          ) : (
            <>
              <Eye className="w-4 h-4" />  {/* Icon for 'Show' */}
              <span>Show</span>
            </>
          )}
        </Button>

        <Button
          onClick={()=>{
            copy({text: secretKey});
          }}
          className="flex items-center space-x-2 bg-green-500 hover:bg-green-600 text-white"
        >
          {isCopied ? <CheckIcon className="h-5 w-5"  /> : <CopyIcon className="h-5 w-5"  />}
          <span>Copy</span>
        </Button>
      </div>
    </div>
  );
}
