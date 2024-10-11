import { LeadMagnet } from "@smartleadmagnet/database";
import { useEffect, useState } from "react";
import axios from "axios";
import llm from "@/data/llm.json";
import { LLMProvider, LLMModel } from "@/types/llm";
import { useLayoutContext } from "@/context/LayoutContext";

const useAIForm = ({ leadMagnet }: { leadMagnet: LeadMagnet }) => {
	const {elementsList} = useLayoutContext();
	const defaultLLMProvider = leadMagnet?.provider ? llm.find((provider) => provider.name === leadMagnet.provider) : llm[0];
	const [prompt, setPrompt] = useState<string>(leadMagnet?.prompt || "");
	const [selectedProvider, setSelectedProvider] = useState<LLMProvider>(defaultLLMProvider);
	const [selectedModel, setSelectedModel] = useState<string>(leadMagnet.model || selectedProvider?.models[0]?.name || "");
	const [outputType, setOutputType] = useState<string>(leadMagnet?.output || "text");
	
	const updateData = async () => {
		try {
			await axios.post(`/api/lead/${leadMagnet.id}`, {
				prompt,
				provider: selectedProvider?.name,
				model: selectedModel,
				output: outputType
			});
		} catch (e) {
			console.log(e);
		}
	};
	
	const filterProviders = (providers: LLMProvider[], output?: string): LLMProvider[] => {
		const type = output || outputType;
		return providers.filter(provider =>
			provider.models.some(model => {
				if (type === "image") return model.generateImage;
				if (type === "text"|| type === "markdown") return model.text;
				return true;
			})
		);
	};
	
	const filterModels = (models: LLMModel[]): LLMModel[] => {
		const hasImageOrFile = elementsList.some(element => element.type === "image" || element.type === "file");
		
		return models.filter(model => {
			if (outputType === "image") return model.generateImage;
			if (outputType === "text" || outputType === "markdown") {
				if (hasImageOrFile) return model.text && model.vision;
				return model.text;
			}
			return true;
		});
	};
	
	const onOutputTypeChange = (type: string) => {
		setOutputType(type);
		const filteredProviders = filterProviders(llm, type);
		const filteredModels = filterModels(selectedProvider?.models || []);
		
		if (!filteredProviders.find(provider => provider.name === selectedProvider?.name)) {
			setSelectedProvider(filteredProviders[0]);
		}
		
		if (!filteredModels.find(model => model.name === selectedModel)) {
			setSelectedModel(filteredModels[0]?.name || "");
		}
	}
	
	const onProviderChange = (provider: string) => {
		const newProvider = llm.find((p) => p.name === provider);
		setSelectedProvider(newProvider);
		
		const filteredModels = filterModels(newProvider?.models || []);
		setSelectedModel(filteredModels[0]?.name || "");
	};
	
	useEffect(() => {
		const filteredModels = filterModels(selectedProvider?.models || []);
		
		if (!filteredModels.find(model => model.name === selectedModel)) {
			setSelectedModel(filteredModels[0]?.name || "");
		}
		
		const handler = setTimeout(() => {
			updateData();
		}, 500);
		
		return () => {
			clearTimeout(handler);
		};
	}, [prompt, selectedModel, outputType, selectedProvider, elementsList]);
	
	const filteredProviders = filterProviders(llm);
	const filteredModels = filterModels(selectedProvider?.models || []);
	
	return {
		prompt,
		setPrompt,
		providers: filteredProviders,
		onProviderChange,
		selectedProvider,
		selectedModel,
		setSelectedModel,
		outputType,
		setOutputType: onOutputTypeChange,
		filteredModels
	};
};

export default useAIForm;