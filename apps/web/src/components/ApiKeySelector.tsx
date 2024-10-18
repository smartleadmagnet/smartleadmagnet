"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@smartleadmagnet/ui/components/ui/button";
import { toast } from "@smartleadmagnet/ui/hooks/use-toast";
import { ApiKey } from "@smartleadmagnet/database"; // Adjust import as necessary
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@smartleadmagnet/ui/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@smartleadmagnet/ui/components/ui/dialog";
import Link from "next/link";
import { useBuilderContext } from "@/providers/BuilderProvider";

const SmartLeadMagnetKey = "SmartLeadMagnet";
const defaultAPIKey = { id: SmartLeadMagnetKey, keyName: "Smart Lead Magnet Key" };

const ApiKeySelector = () => {
  const { fetchApiKeys, updateSettingFormData, leadMagnet } = useBuilderContext();
  const [apiKeys, setApiKeys] = useState<Array<ApiKey>>([defaultAPIKey]);
  const [selectedKey, setSelectedKey] = useState(SmartLeadMagnetKey);
  const [modalOpen, setModalOpen] = useState(false);

  // Fetch API keys on mount
  useEffect(() => {
    const getApiKeys = async () => {
      try {
        const keys = await fetchApiKeys(); // Fetching keys from your API
        setApiKeys([defaultAPIKey, ...keys]); // Set the keys in the state

        // if leadMagnet has an API key, set it as the selected key
        if (leadMagnet.apiKeyId) {
          const selected = keys.find((key) => key.id === leadMagnet.apiKeyId);
          if (selected) {
            setSelectedKey(selected.id);
          }
        }
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Could not fetch API keys",
        });
      }
    };

    getApiKeys();
  }, []);

  const handleSave = async () => {
    if (selectedKey) {
      try {
        if (selectedKey === SmartLeadMagnetKey) {
          await updateSettingFormData({
            apiKeyId: null,
          }); // Save the selected key to the database
        } else {
          await updateSettingFormData({
            apiKeyId: selectedKey,
          });
        }

        toast({
          title: "Success",
          description: `Successfully saved key`,
        });
        setModalOpen(false);
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Could not save the selected key",
        });
      }
    } else {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please select an API key",
      });
    }
  };

  return (
    <>
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Select an API Key</DialogTitle>
            <DialogDescription>Choose an existing key or add a new one.</DialogDescription>
          </DialogHeader>

          <div className="mb-2">
            <Select value={selectedKey} onValueChange={setSelectedKey}>
              <SelectTrigger className="rounded border p-2">
                <SelectValue placeholder="Select an API Key" />
              </SelectTrigger>
              <SelectContent>
                {apiKeys.map((key) => (
                  <SelectItem key={key.id} value={key.id}>
                    {key.keyName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <DialogFooter>
            <div className="flex w-full flex-row justify-between">
              <Link href="/settings/manage-keys" className="btn btn-primary mb-4 rounded-md text-cyan-600">
                Manage Your AI Keys.
              </Link>
              <div className="flex flex-row gap-2">
                <Button onClick={() => setModalOpen(false)} variant="outline">
                  Cancel
                </Button>
                <Button onClick={handleSave} disabled={!selectedKey}>
                  Save
                </Button>
              </div>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Button variant="ghost" className="border border-cyan-600" onClick={() => setModalOpen(true)}>
        Manage Your Keys
      </Button>
    </>
  );
};

export default ApiKeySelector;
