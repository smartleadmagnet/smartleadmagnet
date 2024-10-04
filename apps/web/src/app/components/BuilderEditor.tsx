import { Button } from "@smartleadmagnet/ui/components/ui/button";
import { Input } from "@smartleadmagnet/ui/components/ui/input";
import { Label } from "@smartleadmagnet/ui/components/ui/label";
import { Checkbox } from "@smartleadmagnet/ui/components/ui/checkbox";
import { Switch } from "@smartleadmagnet/ui/components/ui/switch";

import { ChildItem } from "../types/builder";

interface BuilderEditorProps {
  data: ChildItem;
  onClose: () => void; // You can pass a close function as a prop
  updateData: (key: string, value: string | boolean) => void; // You can pass an update function as a prop
}

export default function BuilderEditor(props: BuilderEditorProps) {
  const { data, onClose, updateData } = props;

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
        <Label className="text-sm font-semibold mb-2 block">{data.label}</Label>

        <div className="flex flex-col mb-4">
          <Input
            value={data.value}
            onChange={(e) => {
              updateData("value", e.target.value);
            }}
            className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        {data.formElement && (
          <div>
            <div className="flex items-center space-x-2 mb-[20px]">
              <Switch
                id="airplane-mode"
                checked={data.required}
                onCheckedChange={(checked) => {
                  updateData("required", checked);
                }}
              />
              <Label htmlFor="airplane-mode">Required</Label>
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
          </div>
        )}
      </div>
    </div>
  );
}
