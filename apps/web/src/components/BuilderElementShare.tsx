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
// import ColorPicker from "@smartleadmagnet/ui/components/ColorPicker";

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
    | "radio"
    | "email"
    | "website"
    | "color"
    | "number";

  // Add more types as needed
  data: any;
  editable: boolean;
  onEdit: () => void;
  onDelete: () => void;
  updateData: (
    key: string,
    value: string | boolean,
    selectedItem: any
  ) => void;
};

export default function BuilderElement({
  type,
  data,
  editable,
  onEdit,
  onDelete,
  updateData,
}: BuilderElementProps) {

  const internalName = editable ? (
    <span className="bg-blue-200 p-1 px-3 text-sm rounded-md inline-block ">
      {data.name}
    </span>
    ) : null;
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
              {internalName}
            </label>
            <Input
              value={data.value}
              // onChange={(e) => {
              //   updateData("value", e.target.value, data);
              // }}
            />
          </div>
        );
      case "website":
        return (
          <div>
            <label className="text-sm font-semibold mb-[10px] block">
              {data.label}{" "}
              {data.required && <span className="text-red-500">*</span>}
              {internalName}
            </label>
            <div className="relative webiste_link">
              <div className="icon-section bg-gray-400 rounded-l-md flex items-center justify-center absolute top-0 left-0 h-full w-12">
                <Icon name="link" />
              </div>
              <Input
                type="text"
                placeholder="Enter your website URL"
                className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 pl-14"
                value={data.value}
                // onChange={(e) => {
                //   updateData("value", e.target.value, data);
                // }}
              />
            </div>
          </div>
        );
      case "email":
        return (
          <div>
            <label className="text-sm font-semibold mb-[10px] block">
              {data.label}{" "}
              {data.required && <span className="text-red-500">*</span>}
              {internalName}
            </label>
            <div className="relative">
              <div className="icon-section bg-gray-400 rounded-l-md flex items-center justify-center absolute top-0 left-0 h-full w-12">
                <Icon name="email"  />
              </div>
              <Input
                type="email"
                className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 pl-14"
                value={data.value}
                onChange={(e) => {
                  updateData("value", e.target.value, data);
                }}
              />
            </div>
          </div>
        );
      case "number":
        return (
          <div>
            <label className="text-sm font-semibold mb-[10px] block">
              {data.label}{" "}
              {data.required && <span className="text-red-500">*</span>}
              {internalName}
            </label>
            <Input
              type="number" // Ensure the input type is set to number
              value={data.value}
              className="border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => {
                updateData("value", e.target.value, data);
              }}
            />
          </div>
        );

      case "textarea":
        return (
          <div>
            <label className="text-sm font-semibold mb-[10px] block">
              {data.label}{" "}
              {data.required && <span className="text-red-500">*</span>}{" "}
              {internalName}
            </label>
            <Textarea
              value={data.value}
              onChange={(e) => {
                updateData("value", e.target.value, data);
              }}
            />
          </div>
        );
        // case "color":
        //   return (
        //     <div>
        //       <label className="text-sm font-semibold mb-[10px] block">
        //         {data.label}{" "}
        //         {data.required && <span className="text-red-500">*</span>}{" "}
        //         {internalName}
        //       </label>
        //       {/* <ColorPicker
        //         color={data.value}
        //         onChange={(color) => {
        //           updateData("value", color, data);
        //         }}
        //         /> */}
        //     </div>
        //   );
      case "checkbox":
        return (
          <div className="flex items-center">
            <Checkbox
              checked={data.value === "true"}
              // onCheckedChange={(checked) => {
              //   updateData("value", checked ? "true" : "false", data);
              // }}
            />
            <label className="text-sm font-semibold ml-[10px] block">
              {data.label}{" "}
              {data.required && <span className="text-red-500">*</span>}
              {internalName}
            </label>
          </div>
        );
      case "checkbox-group":
        return (
          <div>
            <label className="text-sm font-semibold mb-[10px] block">
              {data.label}{" "}
              {data.required && <span className="text-red-500">*</span>}{" "}
              {internalName}
            </label>
            {data.options && (
              <div className="mb-4">
                {data.options.map((option: Option, index: number) => (
                  <div key={index} className="flex items-center mb-2">
                    <Checkbox checked={data.value?.some((item:Option)=> item.value===option.value)}
                    // onCheckedChange={(checked) => {
                    //   const updatedValue = checked
                    //     ? [...data?.value || [], option]
                    //     : data.value?.filter((item:Option) => item.value !== option.value);
                    //   updateData("value", updatedValue, data);
                    // }
                    // }
                    />
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
              {internalName}
            </Label>
            <Select value={data.value} onValueChange={(value)=>{
              updateData("value", value, data);
            }}>
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
              {internalName}
            </label>
            <RadioGroup defaultValue="comfortable" value={data.value} onValueChange={(value)=>{
              updateData("value", value, data);
            }}>
              {data.options && (
                <>
                  {data.options.map((option: Option, index: number) => (
                    <div className="flex items-center space-x-2" key={index}>
                      <RadioGroupItem
                        value={option.value}
                        id={`item_${index}`}
                        
                      />
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
              {internalName}
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
              {internalName}
            </Label>

            <div className="flex items-center justify-center w-full h-40 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 transition-colors duration-200">
              <Input
                type="file"
                accept="image/*" // Accepts image files only
                className="hidden" // Hides the actual file input
              //   onChange={() => {
              //  }}
              />
              <label
                htmlFor="file-upload"
                className="flex flex-col items-center justify-center w-full h-full cursor-pointer text-gray-500 p-4"
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
        {data.error && (
          <p className="text-sm text-red-500 mt-2">{data.error}</p>
        )}

        {editable && (
          <div className="flex items-center edit_btns">
            {/* Button Group */}
            <div className="inline-flex shadow-sm" role="group">
              {data.type !== "separator" && (
                <Button
                  onClick={onEdit}
                  variant="outline"
                  className="bg-gray-700 text-white rounded-l-lg  hover:bg-gray-800 hover:text-white  rounded-r-none  hover:z-10 focus:z-10"
                >
                  <Icon name="edit" />
                </Button>
              )}
              <Button
                onClick={onDelete}
                variant="outline"
                color="red"
                className="bg-orange-700 text-white hover:text-white rounded-r-lg rounded-l-none hover:bg-orange-800  hover:z-10 focus:z-10"
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
