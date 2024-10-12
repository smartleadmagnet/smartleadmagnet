import { callImageLLM, callTextLLM } from "../llm/utils";
import { LeadMagnet } from "@smartleadmagnet/database";


export const validateLeadWithInput = async ({ leadMagnet, promptInput }: {
	leadMagnet: LeadMagnet,
	promptInput: any
}) => {
	
	console.log({ leadMagnet })
	if (leadMagnet?.output === "image") {
		return await callImageLLM(leadMagnet, promptInput);
	}
	
	return await callTextLLM(leadMagnet, promptInput);
};
