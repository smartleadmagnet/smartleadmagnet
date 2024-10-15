import { Separator } from "@smartleadmagnet/ui/components/ui/separator";
import AddKeyModal from "@/components/AddKeyModal";
import { ApiKey } from "@smartleadmagnet/database";
import SetAsDefaultButton from "@/components/SetDefaultKey";
import DeleteKey from "@/components/DeleteKey";

export default function ManageKeys({ apiKeys }: { apiKeys: ApiKey[] }) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Manage Keys</h3>
        <p className="text-muted-foreground text-sm">Configure your LLM API keys.</p>
      </div>
      <Separator />
      <AddKeyModal />
      <div>
        <h3 className="mb-4 text-lg font-medium">Your Keys</h3>
        <div className="w-full overflow-x-auto">
          <table className="min-w-full rounded-lg border border-gray-200 bg-white">
            <thead>
              <tr>
                <th className="border-b px-4 py-2 text-left text-sm font-medium text-gray-700">Key Name</th>
                <th className="border-b px-4 py-2 text-left text-sm font-medium text-gray-700">API Key</th>
                <th className="border-b px-4 py-2 text-left text-sm font-medium text-gray-700">Provider</th>
                <th className="border-b px-4 py-2 text-left text-sm font-medium text-gray-700">Default</th>
                <th className="border-b px-4 py-2 text-center text-sm font-medium text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {apiKeys.map((key) => (
                <tr key={key.id} className="hover:bg-gray-100">
                  <td className="whitespace-nowrap border-b px-4 py-2">{key.keyName}</td>
                  <td className="whitespace-nowrap border-b px-4 py-2">{key.apiKey.substring(0, 3)}*****</td>
                  <td className="whitespace-nowrap border-b px-4 py-2">{key.provider}</td>
                  <td className="whitespace-nowrap border-b px-4 py-2">{key.isDefault ? "Yes" : "No"}</td>
                  <td className="whitespace-nowrap border-b px-4 py-2">
                    <div className="flex justify-end space-x-4">
                      <SetAsDefaultButton id={key.id} isDefault={key.isDefault} />
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
