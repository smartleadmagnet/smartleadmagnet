import { Button } from "@smartleadmagnet/ui/components/ui/button";
import { Input } from "@smartleadmagnet/ui/components/ui/input";
import { Label } from "@smartleadmagnet/ui/components/ui/label";
import { Switch } from "@smartleadmagnet/ui/components/ui/switch";
import MultiSelectCreatable from "@smartleadmagnet/ui/components/MultiSelectCreatable";
import MultiSelect from "@smartleadmagnet/ui/components/MultiSelect";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@smartleadmagnet/ui/components/ui/select";

interface BuilderEditorProps {
  data: any | null; // You can pass the data as
  onClose: () => void; // You can pass a close function as a prop
  updateData: (key: string, value: string | boolean) => void; // You can pass an update function as a prop
}

export default function BuilderEditor(props: BuilderEditorProps) {
  const { data, onClose, updateData } = props;
  if (!data) return null;

  return (
    <div className="relative flex w-full flex-col justify-between rounded-md bg-white p-4">
      {/* Header with Close Button */}
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-lg font-bold">Edit Form Feild</h1>
        <Button onClick={onClose} className="bg-red-500 text-white">
          Close
        </Button>
      </div>

      {/* Edit Options Rendered from Data */}
      <div>
        <Label className="mb-2 block text-sm font-semibold">Label</Label>

        <div className="mb-4 flex flex-col">
          <Input
            value={data.label}
            onChange={(e) => {
              updateData("label", e.target.value);
            }}
            className="rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        {data.error && <p className="mt-2 text-sm text-red-500">{data.error}</p>}
      </div>
      <div>
        {!["image", "file", "radio", "select", "checkbox-group", "checkbox", "number", "color"].includes(data.type) && (
          <div>
            <Label className="mb-2 block text-sm font-semibold">Value</Label>

            <div className="mb-4 flex flex-col">
              <Input
                value={data.value}
                onChange={(e) => {
                  updateData("value", e.target.value);
                }}
                className="rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            {data.error && <p className="mt-2 text-sm text-red-500">{data.error}</p>}
          </div>
        )}
        {!["image", "file", "radio", "checkbox-group", "checkbox", "number", "color"].includes(data.type) && (
          <div>
            <Label className="mb-2 block text-sm font-semibold">Placeholder</Label>

            <div className="mb-4 flex flex-col">
              <Input
                value={data.placeholder}
                onChange={(e) => {
                  updateData("placeholder", e.target.value);
                }}
                className="rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            {data.error && <p className="mt-2 text-sm text-red-500">{data.error}</p>}
          </div>
        )}
        {data.type === "number" && (
          <div>
            <Label className="mb-2 block text-sm font-semibold">{data.label}</Label>

            <div className="mb-4 flex flex-col">
              <Input
                value={data.value}
                onChange={(e) => {
                  updateData("value", e.target.value);
                }}
                type="number"
                className="rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        )}
        {data.formElement && (
          <div>
            {data.type === "checkbox" && (
              <div className="mb-[20px] flex items-center space-x-2">
                <Switch
                  id="value"
                  checked={data.value === "true"}
                  onCheckedChange={(checked) => {
                    updateData("value", checked ? "true" : "false");
                  }}
                />
                <Label htmlFor="value">Active</Label>
              </div>
            )}

            <div className="mb-[20px] flex items-center space-x-2">
              <Switch
                id="required"
                checked={data.required}
                onCheckedChange={(checked) => {
                  updateData("required", checked);
                }}
              />
              <Label htmlFor="required">Required</Label>
            </div>
            <Label className="mb-2 block text-sm font-semibold">Name</Label>
            <div className="mb-4 flex flex-col">
              <Input
                value={data.name}
                onChange={(e) => {
                  updateData("name", e.target.value
                    .replace(/[^a-zA-Z0-9_\s]/g, '') // Keep letters, numbers, underscores, and spaces
                    .replace(/([a-z])([A-Z])/g, '$1_$2') // Convert camelCase to snake_case
                    .toLowerCase()
                    .replace(/\s+/g, '_')); // Convert spaces to underscores


                }}
                className="rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {["radio", "select", "checkbox-group"].includes(data.type) && (
              <div>
                <div className="mb-[20px]">
                  <Label className="mb-2 block text-sm font-semibold">Default Option</Label>
                  {["radio", "select"].includes(data.type) ? (
                    <Select
                      onValueChange={(value) => {
                        // TODO
                        // @ts-ignore
                        updateData("value", value);
                      }}
                      // TODO
                      // @ts-ignore
                      value={data?.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a Default Option" />
                      </SelectTrigger>
                      <SelectContent>
                        {data.options?.map((option: any) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  ) : (
                    <MultiSelect
                      options={data?.options || []}
                      onChange={(value) => {
                        // TODO
                        // @ts-ignore
                        updateData("value", value);
                      }}
                      value={data?.value}
                      placeholder="Select Opr"
                    />
                  )}
                </div>

                <Label className="mb-2 block text-sm font-semibold">Options</Label>
                <MultiSelectCreatable
                  options={data?.options || []}
                  onChange={(value) => {
                    // @ts-ignore
                    updateData("options", value);
                  }}
                  placeholder="Create options"
                />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
