import { getImageLLMModel, getTextLLMModel } from "./index";
import { HumanMessage, SystemMessage } from "@langchain/core/messages";
import { LeadMagnet } from "@smartleadmagnet/database";

const totalRetry = 1;

function replacePlaceholders(template, values) {
  // Regex to match the whole @[{{number_1}}](number_1) pattern
  return template.replace(/@\[\{\{(.*?)\}\}\]\((.*?)\)/g, (match, key) => {
    return values[key] || match; // Replace with value from object or keep the pattern if not found
  });
}

const resultFormat = `

The output should be inside <lead> html tag e.g. <lead>the response out</lead>
`;

function extractLeadContent(htmlString: string): string | null {
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
      console.log(result?.content);
      return extractLeadContent(result.content as string);
    } catch (error: any) {
      console.log(error);
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

export async function callImageLLM(leadMagnet: LeadMagnet, promptInput: any) {
  // console.log(promptInput);
  let llmModel = getImageLLMModel(leadMagnet?.provider);
  let retryCount = 0;
  const llmApiCall: any = async () => {
    try {
      console.log("Prompt: ", replacePlaceholders(leadMagnet.prompt, promptInput));
      return await llmModel.invoke(replacePlaceholders(leadMagnet.prompt, promptInput));
    } catch (error: any) {
      console.log(error);
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
