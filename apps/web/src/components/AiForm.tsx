import { Label } from "@smartleadmagnet/ui/components/ui/label";
import { useLayoutContext } from "@/context/LayoutContext";
import MentionTextArea from "@smartleadmagnet/ui/components/MentionTextArea";

import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@smartleadmagnet/ui/components/ui/select";
import {
	RadioGroup,
	RadioGroupItem,
} from "@smartleadmagnet/ui/components/ui/radio-group";
import useAIForm from "@/hooks/aiform.hook";
import { LeadMagnet } from "@smartleadmagnet/database";
import { Badge } from "@smartleadmagnet/ui/components/ui/badge";
import { Button } from "@smartleadmagnet/ui/components/ui/button";


export default function AIForm({leadMagnet}: { leadMagnet: LeadMagnet }) {
	const {elementsList} = useLayoutContext();
	const {
		prompt,
		setPrompt,
		providers,
		onProviderChange,
		selectedProvider,
		selectedModel,
		setSelectedModel,
		setOutputType,
		filteredModels,
		outputType,
		onValidatePrompt
	} = useAIForm({leadMagnet})
	return (
		<div className="w-full flex flex-col bg-white rounded-md justify-between relative h-full p-4">
			<div
				className="flex flex-col h-full overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-100 p-1">
				<div className="flex flex-col h-full">
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
					{/* Output Type and Provider */}
					<div className="flex gap-2 w-full">
						<div className="form-control w-full mb-4">
							<Label>Provider</Label>
							<Select value={selectedProvider.name} onValueChange={onProviderChange}>
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
					</div>
					
					{/* API Usage Section */}
					<div className="w-full flex flex-col gap-2">
						<div className="bg-white rounded-lg p-3 border w-full border-primary">
							<div className="flex justify-between items-center mb-1">
								<h3>Models</h3>
							</div>
							<RadioGroup
								value={selectedModel}
								className="grid grid-cols-3 gap-4 mt-2 overflow-hidden"
								onValueChange={setSelectedModel}
							>
								{
									filteredModels.map(model => (
										<div className="flex items-center space-x-2 cursor-pointer" key={model.name}>
											<RadioGroupItem value={model.name} id={model.name}/>
											<Label htmlFor={model.name}>{model.displayName}</Label>
											{
												model.vision && (
													<Badge className="text-[8px] !min-w-[60px]" variant="destructive">Support File</Badge>
												)
											}
											{
												model.generateImage && <Badge className="text-[8px] !min-w-[80px]">Generate Image</Badge>
											}
										</div>
									))
								}
							</RadioGroup>
						</div>
					</div>
				</div>
				<Button className="flex" onClick={onValidatePrompt}>Validate Prompt</Button>
			</div>
		</div>
	);
}
