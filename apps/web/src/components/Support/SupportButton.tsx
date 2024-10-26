"use client";

import classNames from "classnames";
import React from "react";
import { Button } from "@smartleadmagnet/ui/components/ui/button";

type ButtonProps = {
  className?: string;
  name?: string;
};
const SupportButton: React.FC<ButtonProps> = ({ className, name = "Support" }) => {
  return (
    <Button
      className={classNames(
        "flex text-base transition-all duration-200 hover:text-blue-600 focus:text-blue-600",
        className
      )}
      onClick={() => {
        window.$crisp.push(["do", "chat:open"]);
      }}
    >
      {name}
    </Button>
  );
};

export default SupportButton;
