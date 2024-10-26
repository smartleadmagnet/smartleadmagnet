"use client";

import classNames from "classnames";
import React from "react";

type ButtonProps = {
  className?: string;
  name?: string;
};
const Button: React.FC<ButtonProps> = ({ className, name = "Support" }) => {
  return (
    <button
      className={classNames(
        "flex text-base transition-all duration-200 hover:text-blue-600 focus:text-blue-600",
        className
      )}
      onClick={() => {
        window.$crisp.push(["do", "chat:open"]);
      }}
    >
      {name}
    </button>
  );
};

export default Button;
