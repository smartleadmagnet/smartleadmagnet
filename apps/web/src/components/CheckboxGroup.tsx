import { Controller } from "react-hook-form";
import { Checkbox } from "@smartleadmagnet/ui/components/ui/checkbox";
import { Label } from "@smartleadmagnet/ui/components/ui/label";

export type CheckboxGroupProps = {
  label: string;
  name: string;
  required?: boolean;
  control: any;
  errors: Record<string, any>;
  options: Array<{ label: string; value: string }>;
};

const CheckboxGroup = ({ label, name, required, control, errors, options }: CheckboxGroupProps) => (
  <div>
    <Label className="mb-2 block text-sm font-semibold">
      {label} {required && <span className="text-red-500">*</span>}
    </Label>
    <Controller
      name={name}
      control={control}
      rules={{
        required: required ? "This field is required" : false,
      }}
      render={({ field }) => (
        <div>
          {options.map((option) => (
            <div key={option.value} className="flex items-center">
              <Checkbox
                checked={field.value?.includes(option.value)}
                onCheckedChange={(checked) => {
                    
                  if (checked) {
                    field.onChange(field.value ? [...field.value, option.value] : [option.value]);
                  } else {
                    field.onChange(field.value.filter((value) => value !== option.value));
                  }
                  console.log(field.value)
                }}
              />
              <Label className="ml-2">{option.label}</Label>
            </div>
          ))}
        </div>
      )}
    />
    {errors[name] && <span className="text-red-500">{errors[name]?.message}</span>}
  </div>
);

export default CheckboxGroup; 