"use client";

import { useRef } from "react";

import type { ConfettiRef } from "./ui/confetti";
import Confetti from "./ui/confetti";

export default function ConfettiBackground() {
  const confettiRef = useRef<ConfettiRef>(null);

  return (
    <Confetti
      ref={confettiRef}
      className="absolute left-0 top-0 z-0 size-full"
      onMouseEnter={() => {
        confettiRef.current?.fire({});
      }}
    />
  );
}
