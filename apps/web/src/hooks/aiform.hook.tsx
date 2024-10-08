import { LeadMagnet } from "@smartleadmagnet/database";
import { useEffect, useState } from "react";
import axios from "axios";

const useAIForm = ({ leadMagnet }: { leadMagnet: LeadMagnet }) => {
	const [prompt, setPrompt] = useState<string>(leadMagnet?.prompt || "");
	
	const updateData = async () => {
		try {
			await axios.post(`/api/lead/${leadMagnet.id}`, { prompt });
		} catch (e) {
			console.log(e);
		}
	};
	
	useEffect(() => {
		const handler = setTimeout(() => {
			updateData();
		}, 500); // Adjust the delay as needed
		
		return () => {
			clearTimeout(handler); // Cleanup the timeout on unmount or when prompt changes
		};
	}, [prompt]);
	
	return { prompt, setPrompt }; // Return prompt and setPrompt for usage in your component
};

export default useAIForm;