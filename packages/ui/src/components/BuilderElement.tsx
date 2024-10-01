import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { Checkbox } from "./ui/checkbox";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import Icon from "./icon";
import Card from "./ui/card";

type BuilderElementProps = {
  type: "input" | "textarea" | "checkbox" | "select" | "radio-group" | "title" | "subtitle"; // Add more types as needed
  data: {
    title: string;
    label?: string;
  };
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
            <h1 className="text-3xl font-semibold">{data.title}</h1>
          </div>
        );
      case "input":
        return <Input />;
      case "textarea":
        return <Textarea />;
      case "checkbox":
        return <Checkbox />;
      case "select":
        return (
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select an option" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Options</SelectLabel>
                <SelectItem value="option1">Option 1</SelectItem>
                <SelectItem value="option2">Option 2</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        );
      case "radio-group":
        return (
          <RadioGroup>
            <RadioGroupItem value="option1">Option 1</RadioGroupItem>
            <RadioGroupItem value="option2">Option 2</RadioGroupItem>
          </RadioGroup>
        );
      default:
        return <div className="text-center">{data.title}</div>;
    }
  };

  return (
    <div className="form-element">
      
        <div className="text-center" >
        <label className="text-sm font-semibold">{data.title}</label>
        <div>
            {renderElement()}
        </div>
          
        

        {editable && (
          <div className="flex items-center edit_btns">
            {/* Button Group */}
            <div className="inline-flex shadow-sm" role="group">
              <Button
                onClick={onEdit}
                variant="outline"
                className="rounded-l-md"
              >
                Edit
              </Button>
              <Button
                onClick={onDelete}
                variant="outline"
                color="red"
                className="rounded-r-md"
              >
                Delete
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
