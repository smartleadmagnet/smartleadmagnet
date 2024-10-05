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
import {
  RadioGroup,
  RadioGroupItem,
} from "@smartleadmagnet/ui/components/ui/radio-group";
import { Separator } from "@smartleadmagnet/ui/components/ui/separator";
import { ChildItem, Option } from "../types/builder";

import Icon from "@smartleadmagnet/ui/components/icon";

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
    | "radio"; // Add more types as needed
  data: ChildItem;
  editable: boolean;
  onEdit: () => void;
  onDelete: () => void;
};

export default function BuilderElement({
  type,
  data,
  editable,
  onEdit,
  onDelete,
}: BuilderElementProps) {
  const renderElement = () => {
    switch (type) {
      case "title":
        return (
          <div className="text-center">
            <label className="text-sm font-semibold mb-[10px] block">
              {data.label}{" "}
            </label>
            <h1 className="text-3xl font-semibold">{data.value}</h1>
          </div>
        );
      case "subtitle":
        return (
          <div className="text-center">
            <label className="text-sm font-semibold mb-[10px] block">
              {data.label}{" "}
            </label>
            <h2 className="text-2xl font-semibold">{data.value}</h2>
          </div>
        );
      case "paragraph":
        return (
          <div className="text-center">
            <label className="text-sm font-semibold mb-[10px] block">
              {data.label}{" "}
            </label>
            <p>{data.value}</p>
          </div>
        );
      case "separator":
        return (
          <div>
            <label className="text-sm font-semibold mb-[10px] block">
              {data.label}{" "}
            </label>
            <Separator className="mt-[40px] mb-[20px]" />
          </div>
        );
      case "text_field":
        return (
          <div>
            <label className="text-sm font-semibold mb-[10px] block">
              {data.label}{" "}
              {data.required && <span className="text-red-500">*</span>}
              <span className="bg-blue-200 p-1 px-3 text-sm rounded-md inline-block ">
                {data.name}
              </span>
            </label>
            <Input value={data.value} readOnly />
          </div>
        );
      case "textarea":
        return (
          <div>
            <label className="text-sm font-semibold mb-[10px] block">
              {data.label}{" "}
              {data.required && <span className="text-red-500">*</span>}{" "}
              <span className="bg-blue-200 p-1 px-3 text-sm rounded-md inline-block ">
                {data.name}
              </span>
            </label>
            <Textarea />
          </div>
        );
      case "checkbox":
        return (
          <div className="flex items-center">
            <Checkbox checked={data.value === "true"} />
            <label className="text-sm font-semibold ml-[10px] block">
              {data.label}{" "}
              {data.required && <span className="text-red-500">*</span>}
              <span className="bg-blue-200 p-1 px-3 text-sm rounded-md inline-block ">
                {data.name}
              </span>
            </label>
          </div>
        );
      case "checkbox-group":
        return (
          <div>
            <label className="text-sm font-semibold mb-[10px] block">
              {data.label}{" "}
              {data.required && <span className="text-red-500">*</span>}{" "}
              <span className="bg-blue-200 p-1 px-3 text-sm rounded-md inline-block ">
                {data.name}
              </span>
            </label>
            {data.options && (
              <div className="mb-4">
                {data.options.map((option: Option, index: number) => (
                  <div key={index} className="flex items-center mb-2">
                    <Checkbox />
                    <Label
                      htmlFor={option.value}
                      className="text-sm font-semibold ml-[10px] block"
                    >
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
            <Label className="text-sm font-semibold mb-[10px] block">
              {data.label}{" "}
              {data.required && <span className="text-red-500">*</span>}{" "}
              <span className="bg-blue-200 p-1 px-3 text-sm rounded-md inline-block ">
                {data.name}
              </span>
            </Label>
            <Select value={data.value}>
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
            <label className="text-sm font-semibold mb-[10px] block">
              {data.label}{" "}
              <span className="bg-blue-200 p-1 px-3 text-sm rounded-md inline-block ">
                {data.name}
              </span>
            </label>
            <RadioGroup defaultValue="comfortable">
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
            <Label className="text-sm font-semibold mb-[10px] block">
              {data.label}{" "}
              {data.required && <span className="text-red-500">*</span>}{" "}
              <span className="bg-blue-200 p-1 px-3 text-sm rounded-md inline-block">
                {data.name}
              </span>
            </Label>

            <div className="relative w-full">
              <Input
                type="file"
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 focus:outline-none h-auto"
              />
            </div>
          </>
        );
      case "image":
        return (
          <>
            <Label className="text-sm font-semibold mb-[10px] block">
              {data.label}
              {data.required && <span className="text-red-500">*</span>}{" "}
              <span className="bg-blue-200 p-1 px-3 text-sm rounded-md inline-block">
                {data.name}
              </span>
            </Label>

            <div className="flex items-center justify-center w-full h-40 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 transition-colors duration-200">
              <Input
                type="file"
                accept="image/*" // Accepts image files only
                className="hidden" // Hides the actual file input
                onChange={(e) => {
                  if (e.target.files.length) {
                    console.log(e.target.files[0]); // Handle the uploaded file
                  }
                }}
              />
              <label
                htmlFor="file-upload"
                className="flex flex-col items-center justify-center w-full h-full cursor-pointer text-gray-500"
              >
                <span className="text-lg">📁</span>
                <span className="mt-2 text-sm">
                  Drag and drop an image here, or click to select one
                </span>
              </label>
            </div>

            <p className="text-xs text-gray-500 mt-2">
              Please upload an image (JPG, PNG, GIF).
            </p>
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

        {editable && (
          <div className="flex items-center edit_btns">
            {/* Button Group */}
            <div className="inline-flex shadow-sm" role="group">
              {data.type !== "separator" && (
                <Button
                  onClick={onEdit}
                  variant="outline"
                  className="bg-grey-200 rounded-l-md  rounded-r-none  hover:z-10 focus:z-10"
                >
                  <Icon name="edit" />
                </Button>
              )}
              <Button
                onClick={onDelete}
                variant="outline"
                color="red"
                className="  rounded-r-md  rounded-l-none  hover:z-10 focus:z-10"
              >
                <Icon name="delete" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
