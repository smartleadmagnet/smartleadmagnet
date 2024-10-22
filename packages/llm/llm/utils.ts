import { getImageLLMModel, getTextLLMModel } from "./index";
import { HumanMessage, SystemMessage } from "@langchain/core/messages";
import { LeadMagnet } from "@smartleadmagnet/database";

const totalRetry = 1;

const resultFormat = `

The output should be inside <lead> html tag e.g. <lead>the response out</lead>
`;

function extractLeadContent(htmlString: string): string | undefined | null {
  const regex = /<lead>([\s\S]*?)<\/lead>/;
  const match = htmlString.match(regex);

  // If a match is found, return the content inside the <lead> tag
  return match && match.length > 1 ? match[1] : null;
}

export async function callTextLLM(leadMagnet: LeadMagnet, promptInput: any) {
  // console.log(promptInput);
  let llmModel = getTextLLMModel(leadMagnet.provider, leadMagnet.model);
  const messages = [
    new SystemMessage(`${leadMagnet.prompt}${resultFormat}`),
    new HumanMessage({
      content: promptInput,
    }),
  ];
  let retryCount = 0;
  const llmApiCall: any = async () => {
    try {
      const result = await llmModel.invoke(messages);
      return extractLeadContent(result.content as string);
    } catch (error: any) {
      if (retryCount < totalRetry) {
        retryCount++;
        // console.log("Retrying the request");
        return llmApiCall();
      }
      throw new Error("Failed to generate the response from the AI model");
    }
  };
  return llmApiCall();
}

export async function callImageLLM(leadMagnet: LeadMagnet, promptInput: any, apiKey?: string | null) {
  return getImageLLMModel(leadMagnet, promptInput, apiKey);
}
