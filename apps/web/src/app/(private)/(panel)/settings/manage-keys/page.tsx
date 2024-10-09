"use client";
import { useState } from "react";
import { Separator } from "@smartleadmagnet/ui/components/ui/separator";
import { Button } from "@smartleadmagnet/ui/components/ui/button";
import { Switch } from "@smartleadmagnet/ui/components/ui/switch";
import { Input } from "@smartleadmagnet/ui/components/ui/input";
import {
  TrashIcon,
} from "lucide-react";

import AddKeyModal from "@/components/AddKeyModal";
export default function SettingsNotificationsPage() {
  const [isOpen, setIsOpen] = useState(false);

  const [apiKeys, setApiKeys] = useState([
    { name: "API Key 1", key: "12345-abcde-67890", isDefault: false },
    { name: "API Key 2", key: "23456-bcdef-78901", isDefault: true },
    { name: "API Key 3", key: "34567-cdefg-89012", isDefault: false },
    { name: "API Key 4", key: "45678-defgh-90123", isDefault: false },
  ]);
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Manage Keys</h3>
        <p className="text-sm text-muted-foreground">
          Configure your LLM API keys.
        </p>
      </div>
      <Separator />
      <Button className="btn-primary" onClick={() => setIsOpen(true)}>
        + Add Key
      </Button>

      <div>
        <h3 className="mb-4 text-lg font-medium">Your Keys</h3>
        <div className="space-y-4">
          {apiKeys.map((keyObj, index) => (
            <div
              key={index}
              className="flex flex-row items-center justify-between rounded-lg border p-4"
            >
              <div className="space-y-0.5">
                <div className="text-base mb-2">{keyObj.name}</div>
                <div className="text-muted-foreground flex items-center space-x-2">
                  <Input
                    type="password"
                    value={keyObj.key} // Accessing the key value
                    readOnly
                    className="w-full bg-transparent border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500 transition w-[300px]" 
                  />
                  <Button className="bg-red-700"><TrashIcon className="w-3 h-3"/></Button>
                </div>
                
              </div>
              <div className="flex items-center">
                  <span className="mr-2 text-sm">Default</span>
                  <Switch checked={keyObj.isDefault} />
                </div>
              
            </div>
          ))}
        </div>
      </div>
      <AddKeyModal open={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
}
