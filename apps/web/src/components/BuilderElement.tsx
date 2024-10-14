import { Button } from "@smartleadmagnet/ui/components/ui/button";
import { Input } from "@smartleadmagnet/ui/components/ui/input";
import { Textarea } from "@smartleadmagnet/ui/components/ui/textarea";
import { Checkbox } from "@smartleadmagnet/ui/components/ui/checkbox";
import { Label } from "@smartleadmagnet/ui/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@smartleadmagnet/ui/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@smartleadmagnet/ui/components/ui/radio-group";
import { Separator } from "@smartleadmagnet/ui/components/ui/separator";
import { Option } from "@/app/types/builder";
import ColorPicker from "@smartleadmagnet/ui/components/ColorPicker";

import Icon from "@smartleadmagnet/ui/components/icon";
import { useState } from "react";
import { useDropzone } from "react-dropzone";

export type BuilderElementProps = {
  type:
    | "text_field"
    | "textarea"
    | "checkbox"
    | "select"
    | "radio-group"
    | "title"
    | "subtitle"
    | "checkbox-group"
    | "file"
    | "image"
    | "paragraph"
    | "separator"
    | "radio"
    | "email"
    | "website"
    | "color"
    | "number";

  // Add more types as needed
  data: any;
  editable: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
  updateData?: (key: string, value: string | boolean, selectedItem: any) => void;
};

export default function BuilderElement({ type, data, editable, onEdit, onDelete, updateData }: BuilderElementProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const onDrop = (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setPreview(result); // Show preview
        updateData?.("value", result, data); // Update the data with base64 image
      };
      reader.readAsDataURL(file); // Convert image to base64
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [],
    },
  });

  const internalName = editable ? (
    <span className="inline-block rounded-md bg-blue-200 p-1 px-3 text-sm ">{data.name}</span>
  ) : null;
  const renderElement = () => {
    switch (type) {
      case "title":
        return (
          <div className="text-center">
            <label className="mb-[10px] block text-sm font-semibold">{data.label} </label>
            <h1 className="text-3xl font-semibold">{data.value}</h1>
          </div>
        );
      case "subtitle":
        return (
          <div className="text-center">
            <label className="mb-[10px] block text-sm font-semibold">{data.label} </label>
            <h2 className="text-2xl font-semibold">{data.value}</h2>
          </div>
        );
      case "paragraph":
        return (
          <div className="text-center">
            <label className="mb-[10px] block text-sm font-semibold">{data.label} </label>
            <p>{data.value}</p>
          </div>
        );
      case "separator":
        return (
          <div>
            <label className="mb-[10px] block text-sm font-semibold">{data.label} </label>
            <Separator className="mb-[20px] mt-[40px]" />
          </div>
        );
      case "text_field":
        return (
          <div>
            <label className="mb-[10px] block text-sm font-semibold">
              {data.label} {data.required && <span className="text-red-500">*</span>}
              {internalName}
            </label>
            <Input
              value={data.value}
              onChange={(e) => {
                updateData?.("value", e.target.value, data);
              }}
            />
          </div>
        );
      case "website":
        return (
          <div>
            <label className="mb-[10px] block text-sm font-semibold">
              {data.label} {data.required && <span className="text-red-500">*</span>}
              {internalName}
            </label>
            <div className="webiste_link relative">
              <div className="icon-section absolute left-0 top-0 flex h-full w-12 items-center justify-center rounded-l-md bg-gray-400">
                <Icon name="link" />
              </div>
              <Input
                type="text"
                placeholder="Enter your website URL"
                className="w-full rounded-md border border-gray-300 px-4 py-2 pl-14 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={data.value}
                onChange={(e) => {
                  updateData?.("value", e.target.value, data);
                }}
              />
            </div>
          </div>
        );
      case "email":
        return (
          <div>
            <label className="mb-[10px] block text-sm font-semibold">
              {data.label} {data.required && <span className="text-red-500">*</span>}
              {internalName}
            </label>
            <div className="relative">
              <div className="icon-section absolute left-0 top-0 flex h-full w-12 items-center justify-center rounded-l-md bg-gray-400">
                <Icon name="email" />
              </div>
              <Input
                type="email"
                className="w-full rounded-md border border-gray-300 px-4 py-2 pl-14 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={data.value}
                onChange={(e) => {
                  updateData?.("value", e.target.value, data);
                }}
              />
            </div>
          </div>
        );
      case "number":
        return (
          <div>
            <label className="mb-[10px] block text-sm font-semibold">
              {data.label} {data.required && <span className="text-red-500">*</span>}
              {internalName}
            </label>
            <Input
              type="number" // Ensure the input type is set to number
              value={data.value}
              className="rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => {
                updateData?.("value", e.target.value, data);
              }}
            />
          </div>
        );

      case "textarea":
        return (
          <div>
            <label className="mb-[10px] block text-sm font-semibold">
              {data.label} {data.required && <span className="text-red-500">*</span>} {internalName}
            </label>
            <Textarea
              value={data.value}
              onChange={(e) => {
                updateData?.("value", e.target.value, data);
              }}
            />
          </div>
        );
      case "color":
        return (
          <div>
            <label className="mb-[10px] block text-sm font-semibold">
              {data.label} {data.required && <span className="text-red-500">*</span>} {internalName}
            </label>
            <ColorPicker
              color={data.value}
              onChange={(color) => {
                updateData?.("value", color, data);
              }}
            />
          </div>
        );
      case "checkbox":
        return (
          <div className="flex items-center">
            <Checkbox
              checked={data.value === "true"}
              onCheckedChange={(checked) => {
                updateData?.("value", checked ? "true" : "false", data);
              }}
            />
            <label className="ml-[10px] block text-sm font-semibold">
              {data.label} {data.required && <span className="text-red-500">*</span>}
              {internalName}
            </label>
          </div>
        );
      case "checkbox-group":
        return (
          <div>
            <label className="mb-[10px] block text-sm font-semibold">
              {data.label} {data.required && <span className="text-red-500">*</span>} {internalName}
            </label>
            {data.options && (
              <div className="mb-4">
                {data.options.map((option: Option, index: number) => (
                  <div key={index} className="mb-2 flex items-center">
                    <Checkbox
                      checked={data.value?.some((item: Option) => item.value === option.value)}
                      onCheckedChange={(checked) => {
                        const updatedValue = checked
                          ? [...(data?.value || []), option]
                          : data.value?.filter((item: Option) => item.value !== option.value);
                        updateData?.("value", updatedValue, data);
                      }}
                    />
                    <Label htmlFor={option.value} className="ml-[10px] block text-sm font-semibold">
                      {option.label}{" "}
                    </Label>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      case "select":
        return (
          <div>
            <Label className="mb-[10px] block text-sm font-semibold">
              {data.label} {data.required && <span className="text-red-500">*</span>} {internalName}
            </Label>
            <Select
              value={data.value}
              onValueChange={(value) => {
                updateData?.("value", value, data);
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select an option" />
              </SelectTrigger>
              <SelectContent>
                {data.options && (
                  <div className="mb-4">
                    {data.options.map((option: Option, index: number) => (
                      <SelectItem key={index} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </div>
                )}
              </SelectContent>
            </Select>
          </div>
        );
      case "radio":
        return (
          <>
            <label className="mb-[10px] block text-sm font-semibold">
              {data.label} {internalName}
            </label>
            <RadioGroup
              defaultValue="comfortable"
              value={data.value}
              onValueChange={(value) => {
                updateData?.("value", value, data);
              }}
            >
              {data.options && (
                <>
                  {data.options.map((option: Option, index: number) => (
                    <div className="flex items-center space-x-2" key={index}>
                      <RadioGroupItem value={option.value} id={`item_${index}`} />
                      <Label htmlFor={`item_${index}`}>{option.label}</Label>
                    </div>
                  ))}
                </>
              )}
            </RadioGroup>
          </>
        );
      case "file":
        return (
          <>
            <Label className="mb-[10px] block text-sm font-semibold">
              {data.label} {data.required && <span className="text-red-500">*</span>} {internalName}
            </Label>

            <div className="relative w-full">
              <Input
                type="file"
                className="block h-auto w-full text-sm text-gray-500 file:mr-4 file:rounded-md file:border-0 file:bg-blue-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-blue-700 hover:file:bg-blue-100 focus:outline-none"
                onChange={async (e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onloadend = () => {
                      updateData?.("value", reader.result as string, data); // Base64 data
                    };
                    reader.readAsDataURL(file); // Convert file to base64
                  }
                }}
              />
            </div>
          </>
        );
      case "image":
        return (
          <>
            <Label className="mb-[10px] block text-sm font-semibold">
              {data.label}
              {data.required && <span className="text-red-500">*</span>}{" "}
            </Label>

            <div
              {...getRootProps()}
              className={`flex h-40 w-full items-center justify-center rounded-lg border-2 border-dashed transition-colors duration-200 ${
                isDragActive ? "border-blue-500" : "border-gray-300"
              }`}
            >
              <input {...getInputProps()} />
              <label className="flex h-full w-full cursor-pointer flex-col items-center justify-center p-4 text-gray-500">
                <span className="text-lg">📁</span>
                <span className="mt-2 text-sm">
                  {isDragActive ? "Drop the image here..." : "Drag and drop an image here, or click to select one"}
                </span>
              </label>
            </div>

            <p className="mt-2 text-xs text-gray-500">Please upload an image (JPG, PNG, GIF).</p>

            {/* Image preview */}
            {preview && (
              <div className="mt-4">
                <p className="text-sm font-semibold">Image Preview:</p>
                <img src={preview} alt="Preview" className="mt-2 h-auto max-w-full rounded border" />
              </div>
            )}
          </>
        );

      default:
        return <div className="text-center">{data.title}</div>;
    }
  };

  return (
    <div className="form-element">
      <div>
        <div>{renderElement()}</div>
        {data.error && <p className="mt-2 text-sm text-red-500">{data.error}</p>}

        {editable && (
          <div className="edit_btns flex items-center">
            <div className="inline-flex shadow-sm" role="group">
              {data.type !== "separator" && onEdit && (
                <Button
                  onClick={onEdit}
                  variant="outline"
                  className="rounded-l-lg rounded-r-none bg-gray-700  text-white hover:z-10  hover:bg-gray-800  hover:text-white focus:z-10"
                >
                  <Icon name="edit" />
                </Button>
              )}
              {onDelete && (
                <Button
                  onClick={onDelete}
                  variant="outline"
                  color="red"
                  className="rounded-l-none rounded-r-lg bg-orange-700 text-white hover:z-10 hover:bg-orange-800  hover:text-white focus:z-10"
                >
                  <Icon name="delete" />
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
