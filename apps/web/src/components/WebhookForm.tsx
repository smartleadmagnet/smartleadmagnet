import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@smartleadmagnet/ui/components/ui/button";
import { Input } from "@smartleadmagnet/ui/components/ui/input";
import { Label } from "@smartleadmagnet/ui/components/ui/label";
import { useBuilderContext } from "@/providers/BuilderProvider";
import { toast } from "@smartleadmagnet/ui/hooks/use-toast";
import axios from "axios";

// Zod schema for form validation
const webhookSchema = z.object({
  webhookUrl: z.string().url("Please enter a valid URL"),
});

export default function WebhookForm() {
  const { updateSettingFormData, leadMagnet } = useBuilderContext();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(webhookSchema),
  });

  // Handle form submission
  const onSubmit = async (data: any) => {
    await updateSettingFormData({ webhook: data.webhookUrl });
    toast({
      title: "Webhook URL saved successfully",
    });
  };

  // Handle sending a test request
  const handleSendTest = async (data: any) => {
    const webhookUrl = data.webhookUrl;
    try {
      const resut = await axios.post(`/api/lead/${leadMagnet.id}/webhook/test`, {
        url: webhookUrl,
      });
      if (resut.data.success) {
        toast({
          title: "Test request sent successfully",
        });
      } else {
        toast({
          title: "Test request failed",
          variant: "destructive",
        });
      }
    } catch (e) {
      toast({
        title: "Test request failed",
        description: e.message,
        variant: "destructive",
      });
    }
    // const webhookResult = await triggerWebhook(webhookUrl, { test: true });
    // if (webhookResult.success) {
    //   toast({
    //     title: "Test request sent successfully",
    //   });
    // } else {
    //   toast({
    //     title: "Test request failed",
    //     variant: "destructive",
    //   });
    // }
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
