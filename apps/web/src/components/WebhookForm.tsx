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
		formState: {errors},
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
		<div className="w-full flex flex-col bg-white p-4 rounded-md">
			<form onSubmit={handleSubmit(onSubmit)} className="w-full">
				{/* Webhook URL Input */}
				<div className="form-control w-full mb-4">
					<Label className="text-sm font-semibold mb-[10px] block">Webhook URL</Label>
					<Input
						{...register("webhookUrl")}
						placeholder="Enter webhook URL"
						className="w-full"
					/>
					{errors.webhookUrl && (
						<span className="text-red-500 text-sm">{errors.webhookUrl.message}</span>
					)}
				</div>
				
				{/* Save Button */}
				<Button className="mt-4" type="submit">
					Save
				</Button>
				
				{/* Send Test Button */}
				<Button
					className="mt-4 ml-2"
					onClick={handleSubmit(handleSendTest)} // Using the same handler to get valid data
				>
					Send Test
				</Button>
			</form>
		</div>
	);
}
