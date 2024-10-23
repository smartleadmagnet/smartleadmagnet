import React from "react";
import { Info, CheckCircle } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@smartleadmagnet/ui/components/ui/tooltip";

export default function FeatureLine({ title, hint }: { title: string; hint?: string }) {
  return (
    <li className="flex items-center gap-2">
      <CheckCircle className="h-5 w-5 flex-shrink-0 text-green-500" />
      {hint ? (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger className="text-left">
              <div className="flex w-full flex-row items-center justify-between">
                <span className="w-full cursor-pointer text-left">{title}</span>
                <Info className="ml-1 h-4 w-4 cursor-pointer text-gray-400" />
              </div>
            </TooltipTrigger>
            <TooltipContent className="max-w-[250px]">{hint}</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ) : (
        <span>{title}</span>
      )}
    </li>
  );
}
