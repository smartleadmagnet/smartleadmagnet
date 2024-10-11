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
		setSelectedModel,
		setOutputType,
		outputType
	} = useAIForm({leadMagnet})
	const {elementsList} = useLayoutContext();
	return (
		<div className="w-full flex flex-col bg-white p-4 rounded-md justify-between relative">
			<div
				className="flex flex-col overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-100 p-1">
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
						<Select value={outputType} onValueChange={setOutputType}>
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
						<RadioGroup value={selectedModel} className="flex gap-4 gap-x-5 mt-2 flex-wrap overflow-hidde" onValueChange={setSelectedModel}>
							{
								selectedProvider.models.map(model =>
									(
										<div className="flex items-center space-x-2 cursor-pointer" key={model.name}>
											<RadioGroupItem value={model.name}
											                id={model.name}>{model.displayName}</RadioGroupItem>
											<Label htmlFor={model.name}>{model.displayName}</Label>
										</div>
									))
							}
						</RadioGroup>
					</div>
				</div>
			</div>
		</div>
	);
}
