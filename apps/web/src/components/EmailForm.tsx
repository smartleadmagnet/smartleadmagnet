import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@smartleadmagnet/ui/components/ui/button";
import { Input } from "@smartleadmagnet/ui/components/ui/input";
import { Label } from "@smartleadmagnet/ui/components/ui/label";
import { toast } from "@smartleadmagnet/ui/hooks/use-toast";
import ReactQuill from "react-quill"; // Import React Quill
import "react-quill/dist/quill.snow.css"; // Import the Quill styles
import axios from "axios";
import { useBuilderContext } from "@/providers/BuilderProvider";

// Zod schema for form validation
const emailSchema = z.object({
  subject: z.string().min(1, "Subject is required"),
  content: z.string().min(1, "Email content is required"),
});

export default function AutomatedEmailForm() {
  const { updateSettingFormData, leadMagnet } = useBuilderContext();

  console.log({ leadMagnet });

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      subject: leadMagnet.emailSubject,
      content: leadMagnet.emailContent,
    },
  });

  // Handle form submission to save email data
  const onSubmit = async (data: any) => {
    await updateSettingFormData({
      emailSubject: data.subject,
      emailContent: data.content,
    });
    toast({
      title: "Email form saved successfully",
    });
  };

  // Handle sending a test email
  const handleSendTest = async (data: any) => {
    try {
      const result = await axios.post(`/api/lead/${leadMagnet.id}/email/test`, {
        subject: data.subject,
        content: data.content,
      });

      if (result.data.success) {
        toast({
          title: "Test email sent successfully",
        });
        await updateSettingFormData({
          emailSent: true, // Mark email as sent in usage
        });
      } else {
        toast({
          title: "Test email failed",
          variant: "destructive",
        });
      }
    } catch (e) {
      toast({
        title: "Test email failed",
        description: e.message,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex w-full flex-col rounded-md bg-white p-4">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full">
        {/* Subject Input */}
        <div className="form-control mb-4 w-full">
          <Label className="mb-[10px] block text-sm font-semibold">Subject</Label>
          <Input {...register("subject")} placeholder="Enter email subject" className="w-full" />
          {errors.subject && <span className="text-sm text-red-500">{errors.subject.message}</span>}
        </div>

        {/* Email Content Rich Text Editor */}
        <div className="form-control mb-4 w-full">
          <Label className="mb-[10px] block text-sm font-semibold">Email Content</Label>
          <Controller
            name="content"
            control={control}
            render={({ field }) => (
              <ReactQuill
                {...field}
                theme="snow"
                className="w-full"
                placeholder="Enter email content"
                modules={{
                  toolbar: [
                    [{ header: [1, 2, false] }],
                    ["bold", "italic", "underline", "strike"],
                    [{ list: "ordered" }, { list: "bullet" }],
                    ["link", "image"],
                    ["clean"],
                  ],
                }}
              />
            )}
          />
          {errors.content && <span className="text-sm text-red-500">{errors.content.message}</span>}
        </div>

        {/* Save Button */}
        <Button className="mt-4" type="submit">
          Save
        </Button>

        {/* Send Test Button */}
        <Button className="ml-2 mt-4" onClick={handleSubmit(handleSendTest)}>
          Send Test
        </Button>
      </form>
    </div>
  );
}
