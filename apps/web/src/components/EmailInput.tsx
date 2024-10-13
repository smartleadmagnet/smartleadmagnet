import { Controller } from "react-hook-form";
import { Input } from "@smartleadmagnet/ui/components/ui/input";
import { Label } from "@smartleadmagnet/ui/components/ui/label";

export type EmailInputProps = {
  label: string;
  name: string;
  required?: boolean;
  control: any;
  errors: any;
};

const EmailInput = ({ label, name, required, control, errors }: EmailInputProps) => {
  return (
    <div>
      <Label className="mb-2 block text-sm font-semibold">
        {label} {required && <span className="text-red-500">*</span>}
      </Label>
      <Controller
        name={name}
        control={control}
        rules={{
          required: required ? `${label} is required` : false,
          pattern: {
            value: /^\S+@\S+$/i,
            message: "Invalid email address",
          },
        }}
        render={({ field }) => <Input {...field} type="email" />}
      />
      {errors[name] && <span className="text-red-500">{errors[name]?.message}</span>}
    </div>
  );
};

export default EmailInput;
