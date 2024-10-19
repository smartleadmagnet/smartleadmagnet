"use client";
import React, { useState } from "react";
import { Separator } from "@smartleadmagnet/ui/components/ui/separator";
import AddUpdateKeyModal from "@/components/AddUpdateKeyModal";
import { ApiKey, User } from "@smartleadmagnet/database";
import SetAsDefaultButton from "@/components/SetDefaultKey";
import DeleteKey from "@/components/DeleteKey";
import EditKey from "@/components/EditKey";
import SecretKeyManager from "@/components/SecretKeyManager";
import axios from "axios";
import { toast } from "@smartleadmagnet/ui/hooks/use-toast";

export default function ManageKeys({ apiKeys, user }: { apiKeys: ApiKey[]; user: User }) {
  const [selectedKey, setSelectedKey] = useState<ApiKey | null>(null);
  const [secretKey, setSecretKey] = useState<string>(user.key);
  const [loading, setLoading] = useState<boolean>(false);
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Manage Keys</h3>
      </div>
      <SecretKeyManager
        loading={loading}
        secretKey={secretKey}
        generateNewSecretKey={async () => {
          setLoading(true);
          try {
            const { data } = await axios.post("/api/user/key");
            setSecretKey(data.key);
          } catch (e) {
            toast({
              variant: "destructive",
              description: "Failed to generate new key",
            });
          }
          setLoading(false);
        }}
      />
      <Separator />
      <AddUpdateKeyModal isEditing={selectedKey !== null} keyData={selectedKey} setKeyData={setSelectedKey} />
      <div>
        <h3 className="mb-1 text-lg font-medium">Your Keys</h3>
        <p className="text-muted-foreground mb-3 text-sm">Configure your LLM API keys.</p>
        <div className="w-full overflow-x-auto">
          <table className="min-w-full rounded-lg border border-gray-200 bg-white">
            <thead>
              <tr>
                <th className="border-b px-4 py-2 text-left text-sm font-medium text-gray-700">Key Name</th>
                <th className="border-b px-4 py-2 text-left text-sm font-medium text-gray-700">API Key</th>
                <th className="border-b px-4 py-2 text-left text-sm font-medium text-gray-700">Provider</th>
                <th className="border-b px-4 py-2 text-left text-sm font-medium text-gray-700">Default Key</th>
                <th className="border-b px-4 py-2 text-center text-sm font-medium text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {apiKeys.map((key: ApiKey, index: Number) => (
                <tr key={key.id} className={`hover:bg-gray-100 ${index % 2 === 0 ? "odd:bg-gray-50" : ""}`}>
                  <td className="whitespace-nowrap border-b px-4 py-2">{key.keyName}</td>
                  <td className="whitespace-nowrap border-b px-4 py-2">{key.apiKey.substring(0, 3)}*****</td>
                  <td className="whitespace-nowrap border-b px-4 py-2">{key.provider}</td>
                  <td className="whitespace-nowrap border-b px-4 py-2">
                    <SetAsDefaultButton id={key.id} isDefault={key.isDefault} />
                  </td>
                  <td className="whitespace-nowrap border-b px-4 py-2">
                    <div className="flex justify-end space-x-4">
                      <EditKey
                        handleEdit={() => {
                          setSelectedKey(key);
                        }}
                      />
                      <DeleteKey id={key.id} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
