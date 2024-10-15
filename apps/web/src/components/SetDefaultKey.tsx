import React from "react";
import { Switch } from "@smartleadmagnet/ui/components/ui/switch";
import { toggleKey } from "@/actions/api-keys";

async function handleToggle(id: string) {
  await toggleKey(id);
}

export default function SetAsDefaultButton({ id, isDefault }: { id: string; isDefault?: boolean }) {
  const changeDefault = async () => {
    await handleToggle(id); // Call the server action to toggle default status
  };

  return (
    <form className="flex  items-center">
      <Switch
        checked={isDefault} // Set the initial state based on `isDefault`
        onCheckedChange={changeDefault} // Trigger the action when toggled
        className="text-teal-500"
        disabled={isDefault} // Optionally disable the switch if it's already the default
      />
    </form>
  );
}
