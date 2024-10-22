"use client";

import React, { useState } from "react";

import { SquareDashedBottomCode } from "lucide-react";

import SchemaModal from "@/components/SchemaModal";

export default function ViewSchema({ id, components }: { id: string; components: any[] }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);

  const createPayload = (components: { name: string; value: any }[]) => {
    let payload: { [key: string]: any } = {
      id: id,
    };

    components.map((component) => {
      payload[component.name] = component.value || "";
    });

    return payload;
  };

  return (
    <>
      <button onClick={openModal} className="flex items-center ">
        <SquareDashedBottomCode className="mr-2 h-4 w-4" />
        View API Schema
      </button>

      <SchemaModal isOpen={isModalOpen} setIsOpen={setIsModalOpen} payload={createPayload(components)} />
    </>
  );
}
