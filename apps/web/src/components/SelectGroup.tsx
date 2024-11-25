import { Controller } from "react-hook-form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@smartleadmagnet/ui/components/ui/select";
import { Label } from "@smartleadmagnet/ui/components/ui/label";

export type SelectGroupProps = {
  label: string;
  name: string;
  required?: boolean;
  control: any;
  errors: Record<string, any>;
  options: Array<{ label: string; value: string }>;
  placeholder?: string;
};

const SelectGroup = ({ label, name, required, control, errors, options, placeholder }: SelectGroupProps) => (
  <div>
    <Label className="mb-2 block text-sm font-semibold">
      {label} {required && <span className="text-red-500">*</span>}
    </Label>
    <Controller
      name={name}
      control={control}
      rules={{ required: required ? `${label} is required` : false, }}
      render={({ field }) => (
        <Select value={field.value} onValueChange={field.onChange}>
          <SelectTrigger>
            <SelectValue placeholder={placeholder || "Select Option"} />
          </SelectTrigger>
          <SelectContent>
            {options.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
    />
    {errors[name] && <span className="text-red-500">{String(errors[name]?.message)}</span>}
  </div>
);

export default SelectGroup; 