import { Button } from "@smartleadmagnet/ui/components/ui/button";
import { Label } from "@smartleadmagnet/ui/components/ui/label";
import { useLayoutContext } from "@/context/LayoutContext";
import MentionTextArea from "@smartleadmagnet/ui/components/MentionTextArea";

import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@smartleadmagnet/ui/components/ui/select";
import {
	RadioGroup,
	RadioGroupItem,
} from "@smartleadmagnet/ui/components/ui/radio-group";
import useAIForm from "@/hooks/aiform.hook";
import { LeadMagnet } from "@smartleadmagnet/database";


export default function AIForm({leadMagnet}: { leadMagnet: LeadMagnet }) {
	const {
		prompt,
		setPrompt,
		providers,
		onProviderChange,
		selectedProvider,
		selectedModel,
		setSelectedModel
	} = useAIForm({leadMagnet})
	const {elementsList} = useLayoutContext();
	return (
		<div className="w-full flex flex-col bg-white p-4 rounded-md justify-between relative">
			<div
				className="flex flex-col overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-100 p-1">
				{/* Pulse Button */}
				<Button
					variant="outline"
					className="pulse-button mb-4 flex items-center"
				>
					<svg
						stroke="currentColor"
						fill="currentColor"
						strokeWidth="0"
						viewBox="0 0 24 24"
						className="text-lg"
						height="1em"
						width="1em"
						xmlns="http://www.w3.org/2000/svg"
					>
						{/* Icon */}
						<path
							d="m11 4-.5-1-.5 1-1 .125.834.708L9.5 6l1-.666 1 .666-.334-1.167.834-.708zm8.334 10.666L18.5 13l-.834 1.666-1.666.209 1.389 1.181L16.834 18l1.666-1.111L20.166 18l-.555-1.944L21 14.875zM6.667 6.333 6 5l-.667 1.333L4 6.5l1.111.944L4.667 9 6 8.111 7.333 9l-.444-1.556L8 6.5zM3.414 17c0 .534.208 1.036.586 1.414L5.586 20c.378.378.88.586 1.414.586s1.036-.208 1.414-.586L20 8.414c.378-.378.586-.88.586-1.414S20.378 5.964 20 5.586L18.414 4c-.756-.756-2.072-.756-2.828 0L4 15.586c-.378.378-.586.88-.586 1.414zM17 5.414 18.586 7 15 10.586 13.414 9 17 5.414z"></path>
					</svg>
					<span className="mx-4">Generate tool with AI</span>
				</Button>
				<div className="form-control w-full">
					<div className="flex w-full justify-between items-center mb-[10px]">
						<Label>Prompt</Label>
					</div>
					<MentionTextArea
						defaultValue={prompt}
						onPromptChange={setPrompt}
						options={elementsList
							.filter((item: any) => item.formElement)
							.map((element: any) => ({
								id: element.name,
								display: `{{${element.name}}}`
							}))
						}
					
					/>
				</div>
				
				{/* Variables Section */}
				<div className="w-full max-w-xl mb-4">
					<ul className="list-disc text-sm">
						<li>
							Variables:{" "}
							<small>{elementsList.filter((item: any) => item.formElement).map((element: any) => (
								<span className="bg-gray-300 px-2 py-1 inline-block rounded mr-2"
								      key={element.id}>{"{{"} {element.name} {"}}"}</span>
							))}</small>
						</li>
					</ul>
				</div>
				
				
				{/* Output Type and Provider */}
				<div className="flex gap-2 w-full">
					<div className="form-control w-full mb-4">
						<Label>Provider</Label>
						<Select defaultValue={selectedProvider.name} onValueChange={onProviderChange}>
							<SelectTrigger>
								<SelectValue placeholder="Select a LLM Provider"/>
							</SelectTrigger>
							<SelectContent>
								{
									providers?.map(provider => (
										<SelectItem key={provider.name} value={provider.name}>{provider.name}</SelectItem>
									))
								}
							</SelectContent>
						</Select>
					</div>
					<div className="form-control w-full mb-4">
						<Label>Output Type</Label>
						<Select defaultValue="text">
							<SelectTrigger>
								<SelectValue placeholder="Select the output type"/>
							</SelectTrigger>
							<SelectContent>
								<SelectGroup>
									<SelectItem value="text">Text</SelectItem>
									<SelectItem value="markdown">Markdown/Code</SelectItem>
									<SelectItem value="image">Image</SelectItem>
								</SelectGroup>
							</SelectContent>
						</Select>
					</div>
				</div>
				
				{/* API Usage Section */}
				<div className="w-full flex flex-col gap-2">
					<div className="bg-white rounded-lg p-3 border w-full border-primary">
						<div className="flex justify-between items-center mb-1">
							<h3>Models</h3>
						</div>
						<RadioGroup defaultValue={selectedModel} className="flex gap-4 gap-x-5 mt-2">
							{
								selectedProvider.models.map(model => {
									console.log(model);
									return (
										<div className="flex items-center space-x-2 cursor-pointer" key={model.name}>
											<RadioGroupItem value={model.name}
											                id={model.name}>{model.displayName}</RadioGroupItem>
											<Label htmlFor={model.name}>{model.displayName}</Label>
										</div>
									);
								})
							}
						</RadioGroup>
					</div>
				</div>
			</div>
		</div>
	);
}
