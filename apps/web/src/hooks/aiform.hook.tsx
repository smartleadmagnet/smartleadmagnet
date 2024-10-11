import { LeadMagnet } from "@smartleadmagnet/database";
import { useEffect, useState } from "react";
import axios from "axios";
import llm from "@/data/llm.json";
import { LLMProvider } from "@/types/llm";

const useAIForm = ({leadMagnet}: { leadMagnet: LeadMagnet }) => {
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
	
	const onProviderChange = (provider: string) => {
		const newProvider = llm.find((p) => p.name === provider);
		setSelectedProvider(newProvider);
		
		// Select the first model that supports image generation if outputType is "image"
		if (outputType === "image") {
			const imageModel = newProvider?.models.find(model => model.generateImage);
			setSelectedModel(imageModel ? imageModel.name : newProvider?.models[0]?.name || "");
		} else {
			setSelectedModel(newProvider?.models[0]?.name || "");
		}
	};
	
	useEffect(() => {
		// Automatically switch provider and model if output type is "image"
		if (outputType === "image") {
			let providerWithImageModel = selectedProvider;
			let imageModel = selectedProvider?.models.find(model => model.generateImage);
			
			// If current provider does not support image models, find a new provider that does
			if (!imageModel) {
				providerWithImageModel = llm.find(provider => provider.models.some(model => model.generateImage));
				setSelectedProvider(providerWithImageModel);
				imageModel = providerWithImageModel?.models.find(model => model.generateImage);
			}
			
			// Set the image-generating model
			if (imageModel) {
				setSelectedModel(imageModel.name);
			}
		}
		
		const handler = setTimeout(() => {
			updateData();
		}, 500); // Adjust the delay as needed
		
		return () => {
			clearTimeout(handler); // Cleanup the timeout on unmount or when prompt changes
		};
	}, [prompt, selectedModel, outputType, selectedProvider]);
	
	// Filter providers based on output type
	const filteredProviders = outputType === "image"
		? llm.filter(provider => provider.models.some(model => model.generateImage))
		: llm;
	
	// Filter models based on output type
	const filteredModels = outputType === "image"
		? selectedProvider?.models.filter(model => model.generateImage)
		: selectedProvider?.models;
	
	return {
		prompt,
		setPrompt,
		providers: filteredProviders,
		onProviderChange,
		selectedProvider,
		selectedModel,
		setSelectedModel,
		outputType,
		setOutputType,
		filteredModels
	}; // Return filteredProviders and filteredModels for usage in your component
};

export default useAIForm;
