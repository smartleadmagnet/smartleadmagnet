import React from "react";
import { CopyIcon } from "lucide-react";
import { cloneLead } from "@/actions/lead-magnet";
import { redirect } from "next/navigation";

export default function CopyMagnet({ id }: { id: string }) {
  const onClone = async () => {
    "use server";

    const lead = await cloneLead(id);
    console.log(lead);
    redirect(`/builder/${lead?.id!}`);
  };

  return (
    <>
      <form>
        <button formAction={onClone} className="flex items-center    hover:bg-gray-100">
          <CopyIcon className="mr-2 h-4 w-4" />
          Clone Magnet
        </button>
      </form>
    </>
  );
}
