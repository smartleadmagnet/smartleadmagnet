import { Controller } from "react-hook-form";
import { Input } from "@smartleadmagnet/ui/components/ui/input";
import { Label } from "@smartleadmagnet/ui/components/ui/label";

export type WebsiteInputProps = {
  label: string;
  name: string;
  required?: boolean;
  control: any;
  errors: any;
};

const WebsiteInput = ({ label, name, required, control, errors }: WebsiteInputProps) => {
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
            value: /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/,
            message: "Invalid website URL",
          },
        }}
        render={({ field }) => <Input {...field} type="url" />}
      />
      {errors[name] && <span className="text-red-500">{errors[name]?.message}</span>}
    </div>
  );
};

export default WebsiteInput;
