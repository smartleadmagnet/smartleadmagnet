import { Controller } from "react-hook-form";
import { Input } from "@smartleadmagnet/ui/components/ui/input";
import { Label } from "@smartleadmagnet/ui/components/ui/label";
import Icon from "@smartleadmagnet/ui/components/icon";
export type EmailInputProps = {
  label: string;
  name: string;
  required?: boolean;
  control: any;
  errors: Record<string, any>;
  placeholder?: string;
};

const EmailInput = ({ label, name, required, control, errors, placeholder }: EmailInputProps) => (
  <div>
    <Label className="mb-2 block text-sm font-semibold">
      {label} {required && <span className="text-red-500">*</span>}
    </Label>
    <div className="relative">
      <div className="icon-section absolute left-0 top-0 flex h-full w-12 items-center justify-center rounded-l-md bg-gray-400">
        <Icon name="email" />
      </div>
      <Controller
        name={name}
        control={control}
        rules={{
          required: required ? `${label} is required` : false,
          pattern: {
            value: /^\S+@\S+\.\S+$/i,
            message: "Invalid email address",
          },
        }}
        render={({ field }) => (
          <Input {...field} className="pl-14" placeholder={placeholder} type="email" />
        )}
      />
    </div>
    {errors[name] && <span className="text-red-500">{errors[name]?.message}</span>}
  </div>
);

export default EmailInput;
