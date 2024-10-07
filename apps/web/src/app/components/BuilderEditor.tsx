import { Button } from "@smartleadmagnet/ui/components/ui/button";
import { Input } from "@smartleadmagnet/ui/components/ui/input";
import { Label } from "@smartleadmagnet/ui/components/ui/label";
import { Checkbox } from "@smartleadmagnet/ui/components/ui/checkbox";
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

import { ChildItem } from "../types/builder";

interface BuilderEditorProps {
  data: ChildItem | null; // You can pass the data as
  onClose: () => void; // You can pass a close function as a prop
  updateData: (key: string, value: string | boolean) => void; // You can pass an update function as a prop
}

export default function BuilderEditor(props: BuilderEditorProps) {
  const { data, onClose, updateData } = props;
  if (!data) return null;

  return (
    <div className="w-full flex flex-col bg-white p-4 rounded-md justify-between relative">
      {/* Header with Close Button */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-lg font-bold">Edit Form Feild</h1>
        <Button onClick={onClose} className="bg-red-500 text-white">
          Close
        </Button>
      </div>

      {/* Edit Options Rendered from Data */}
      <div>
        {![
          "image",
          "file",
          "radio",
          "select",
          "checkbox-group",
          "checkbox",
          "number",
          "color",
          ,
        ].includes(data.type) && (
          <div>
            <Label className="text-sm font-semibold mb-2 block">
              {data.label}
            </Label>

            <div className="flex flex-col mb-4">
              <Input
                value={data.value}
                onChange={(e) => {
                  updateData("value", e.target.value);
                }}
                className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            {data.error && (
              <p className="text-sm text-red-500 mt-2">{data.error}</p>
            )}
          </div>
        )}
        {data.type === "number" && (
          <div>
            <Label className="text-sm font-semibold mb-2 block">
              {data.label}
            </Label>

            <div className="flex flex-col mb-4">
              <Input
                value={data.value}
                onChange={(e) => {
                  updateData("value", e.target.value);
                }}
                type="number"
                className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        )}
        {data.formElement && (
          <div>
            {data.type === "checkbox" && (
              <div className="flex items-center space-x-2 mb-[20px]">
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

            <div className="flex items-center space-x-2 mb-[20px]">
              <Switch
                id="required"
                checked={data.required}
                onCheckedChange={(checked) => {
                  updateData("required", checked);
                }}
              />
              <Label htmlFor="required">Required</Label>
            </div>
            <Label className="text-sm font-semibold mb-2 block">Name</Label>
            <div className="flex flex-col mb-4">
              <Input
                value={data.name}
                onChange={(e) => {
                  updateData("name", e.target.value);
                }}
                className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {["radio", "select", "checkbox-group"].includes(data.type) && (
              <div>
                <div className="mb-[20px]">
                  <Label className="text-sm font-semibold mb-2 block">
                    Default Option
                  </Label>
                  {["radio", "select"].includes(data.type) ? (
                    <Select
                      onValueChange={(value) => {
                        updateData("value", value);
                      }}
                      value={data.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a Default Option" />
                      </SelectTrigger>
                      <SelectContent>
                        {data.options &&
                          data.options.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                  ) : (
                    <MultiSelect
                      options={data.options}
                      onChange={(value) => {
                        updateData("value", value);
                      }}
                      value={data.value}
                      placeholder="Select Opr"
                    />
                  )}
                </div>

                <Label className="text-sm font-semibold mb-2 block">
                  Options
                </Label>
                <MultiSelectCreatable
                  options={data.options}
                  onChange={(value) => {
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
