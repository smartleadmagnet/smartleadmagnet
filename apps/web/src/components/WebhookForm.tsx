import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@smartleadmagnet/ui/components/ui/button";
import { Input } from "@smartleadmagnet/ui/components/ui/input";
import { Label } from "@smartleadmagnet/ui/components/ui/label";

// Zod schema for form validation
const webhookSchema = z.object({
  webhookUrl: z.string().url("Please enter a valid URL"),
});

export default function WebhookForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(webhookSchema),
  });

  // Handle form submission
  const onSubmit = async (data: any) => {
    console.log("Webhook URL saved:", data.webhookUrl);
    // Make an API call to save the webhook URL
    // await fetch('/api/save-webhook', { method: 'POST', body: JSON.stringify(data) });
  };

  // Handle sending a test request
  const handleSendTest = async (data: any) => {
    console.log("Sending test request to:", data.webhookUrl);
    // You can use fetch or axios to send a request
    // const response = await fetch(data.webhookUrl, { method: 'POST', body: JSON.stringify({ test: true }) });
  };

  return (
    <div className="flex w-full flex-col rounded-md bg-white p-4">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full">
        {/* Webhook URL Input */}
        <div className="form-control mb-4 w-full">
          <Label className="mb-[10px] block text-sm font-semibold">Webhook URL</Label>
          <Input {...register("webhookUrl")} placeholder="Enter webhook URL" className="w-full" />
          {errors.webhookUrl && <span className="text-sm text-red-500">{errors.webhookUrl.message}</span>}
        </div>

        {/* Save Button */}
        <Button className="mt-4" type="submit">
          Save
        </Button>

        {/* Send Test Button */}
        <Button
          className="ml-2 mt-4"
          onClick={handleSubmit(handleSendTest)} // Using the same handler to get valid data
        >
          Send Test
        </Button>
      </form>
    </div>
  );
}
