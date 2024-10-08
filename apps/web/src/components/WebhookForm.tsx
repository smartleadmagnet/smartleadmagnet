import { Button } from "@smartleadmagnet/ui/components/ui/button";
import { Input } from "@smartleadmagnet/ui/components/ui/input";
import { Label } from "@smartleadmagnet/ui/components/ui/label";
import { useState } from "react";

export default function WebhookForm() {
  // State for form fields
  const [webhookData, setWebhookData] = useState({
    webhookUrl: "",
  });

  // Handle input change
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setWebhookData({ ...webhookData, [name]: value });
  };

  // Handle sending test request
  const handleSendTest = async () => {
    // Here you would send a test request to the webhook URL
    // This is a placeholder to simulate the action
    console.log("Sending test request to:", webhookData.webhookUrl);
    // Example: you might use fetch or axios to send a request
    // const response = await fetch(webhookData.webhookUrl, { method: 'POST', body: JSON.stringify({ test: true }) });
  };

  return (
    <div className="w-full flex flex-col bg-white p-4 rounded-md">
      {/* Webhook URL Input */}
      <div className="form-control w-full mb-4">
        <Label className="text-sm font-semibold mb-[10px] block">
          Webhook URL
        </Label>
        <Input
          name="webhookUrl"
          value={webhookData.webhookUrl}
          onChange={handleChange}
          placeholder="Enter webhook URL"
          className="w-full"
        />
      </div>

      {/* Send Test Button */}
      <Button
        className="mt-4"
        onClick={handleSendTest}
      >
        Send Test
      </Button>
    </div>
  );
}
