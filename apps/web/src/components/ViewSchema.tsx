"use client";

import React, { useState } from "react";

import {  SquareDashedBottomCode } from "lucide-react";
import { deleteLead } from "@/actions/lead-magnet";
import { Button } from "@smartleadmagnet/ui/components/ui/button";
import SchemaModal from "@/components/SchemaModal";

export default function ViewSchema({ id,compoenents }: { id: string,compoenents:any[] }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  

  const createPayload = (components: { name: string, value: any }[]) => {

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
      
      <SchemaModal
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        payload={createPayload(compoenents)}
        
      />
    </>
  );
}
