import React from "react";
import { Button } from "@smartleadmagnet/ui/components/ui/button";
import { toggleKey } from "@/actions/api-keys";

async function handleToggle(id: string) {
  await toggleKey(id);
}

export default function SetAsDefaultButton({ id, isDefault }: { id: string; isDefault?: boolean }) {
  const changeDefault = async () => {
    "use server";
    await handleToggle(id); // Call the server action
  };

  return (
    <form className="mb-4 flex justify-end">
      <Button
        formAction={changeDefault}
        variant="ghost"
        disabled={isDefault}
        className="text-teal-500 hover:text-teal-900 hover:underline"
      >
        <span>{!isDefault ? "Set As Default" : ""}</span> {/* Change button text after approval */}
      </Button>
    </form>
  );
}
