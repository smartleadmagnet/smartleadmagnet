import * as React from "react";
import { BlurImage } from "@/components/BlueImage";

const Logo = () => {
  return (
    <div className="flex flex-col gap-4 md:flex-row">
      <div className="flex h-52 w-full items-center justify-center rounded-lg bg-white">
        <BlurImage src="/assets/Logo.png" className="text-black" width={48} height={48} alt="NextGenAIKit.dev" />
      </div>
      <div className="flex h-52 w-full items-center justify-center rounded-lg bg-black">
        <BlurImage src="/assets/Logo.png" className="text-white" width={48} height={48} alt="NextGenAIKit.dev" />
      </div>
    </div>
  );
};

export default Logo;
