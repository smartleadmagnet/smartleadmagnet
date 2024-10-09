import { LeadMagnet } from "@smartleadmagnet/database";
import { useEffect, useState } from "react";
import axios from "axios";
import llm from "@/data/llm.json";
import { LLMProvider } from "@/types/llm";

const useAIForm = ({leadMagnet}: { leadMagnet: LeadMagnet }) => {
	const defaultLLMProvider = leadMagnet?.provider ? llm.find((provider) => provider.name === leadMagnet.provider) : llm[0];
	const [prompt, setPrompt] = useState<string>(leadMagnet?.prompt || "");
	const [selectedProvider, setSelectedProvider] = useState<LLMProvider>(defaultLLMProvider);
	const [selectedModel, setSelectedModel] = useState<string>(leadMagnet.modelName || selectedProvider?.models[0]?.name || "");
	
	const updateData = async () => {
		try {
			await axios.post(`/api/lead/${leadMagnet.id}`, {prompt});
		} catch (e) {
			console.log(e);
		}
	};
	
	const onProviderChange = (provider: string) => {
		setSelectedProvider(llm.find((p) => p.name === provider));
	}
	
	useEffect(() => {
		const handler = setTimeout(() => {
			updateData();
		}, 500); // Adjust the delay as needed
		
		return () => {
			clearTimeout(handler); // Cleanup the timeout on unmount or when prompt changes
		};
	}, [prompt]);
	
	return {prompt, setPrompt, providers: llm, onProviderChange, selectedProvider, selectedModel, setSelectedModel}; // Return prompt and setPrompt for usage in your component
};

export default useAIForm;