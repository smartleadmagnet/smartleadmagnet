import { Controller } from "react-hook-form";
import { Input } from "@smartleadmagnet/ui/components/ui/input";
import { Label } from "@smartleadmagnet/ui/components/ui/label";
import Icon from "@smartleadmagnet/ui/components/icon";

export type WebsiteInputProps = {
  label: string;
  name: string;
  required?: boolean;
  control: any;
  errors: any;
  placeholder?: string;
  clearError: (name: string) => void;
};

const WebsiteInput = ({ label, name, required, control, errors, placeholder,clearError }: WebsiteInputProps) => {
  return (
    <div>
      <Label className="mb-2 block text-sm font-semibold">
        {label} {required && <span className="text-red-500">*</span>}
      </Label>
      <div className="webiste_link relative">
        <div className="icon-section absolute left-0 top-0 flex h-full w-12 items-center justify-center rounded-l-md bg-gray-400">
          <Icon name="link" />
        </div>
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <Input {...field} className="pl-14" type="url" placeholder={placeholder || "Enter your website URL"} 
            onChange={(e) => {
              field.onChange(e);
              clearError(name);
            }}
            />
          )}
        />
      </div>
      {errors[name] && <span className="text-red-500">{String(errors[name])}</span>}
    </div>
  );
};

export default WebsiteInput;
