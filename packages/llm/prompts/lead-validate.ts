import { callImageLLM, callTextLLM } from "../llm/utils";
import { LeadMagnet } from "@smartleadmagnet/database";

const resultFormat = `

The response should be inside <lead> tag
<rrr>AI Generated Response</rrr>
`;

function extractLeadContent(htmlString: string): string | null {
	const regex = /<lead>([\s\S]*?)<\/lead>/;
	const match = htmlString.match(regex);
	
	// If a match is found, return the content inside the <lead> tag
	return match && match.length > 1 ? match[1] : null;
}

export const validateLeadWithInput = async ({ leadMagnet, promptInput }: {
	leadMagnet: LeadMagnet,
	promptInput: any
}) => {
	
	if (leadMagnet?.output === "image") {
		return await callImageLLM(leadMagnet.prompt, promptInput);
	}
	
	const result = await callTextLLM(`${leadMagnet.prompt}${resultFormat}`, promptInput);
	if (result) {
		// take only content inside <bio></bio> tags
		return extractLeadContent(result);
	}
	return "";
};
