"use client";

import React, { useState } from "react";
import { Share } from "lucide-react";
import EmbedModal from "@/components/EmbedModal";

export default function ShareApp({ id }: { id: string }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);

  return (
    <>
      <button onClick={openModal} className="flex items-center  rounded  hover:bg-red-100">
        <Share className="mr-2 h-4 w-4" />
        Share
      </button>

      {isModalOpen && <EmbedModal open={isModalOpen} setIsOpen={setIsModalOpen} magnetId={id} />}
    </>
  );
}
