import { callImageLLM, callTextLLM } from "../llm/utils";
import { LeadMagnet } from "@smartleadmagnet/database";

export const validateLeadWithInput = async ({
  leadMagnet,
  promptInput,
  apiKey,
}: {
  leadMagnet: LeadMagnet;
  promptInput: any;
  apiKey?: string | null;
}) => {
  if (leadMagnet?.output === "image") {
    return await callImageLLM(leadMagnet, promptInput, apiKey);
  }

  const promptData = {};
  const finalPayload = (leadMagnet?.components as Array<any>)?.reduce((acc: any, element: any) => {
    const promptInputElement = promptInput[element.name];
    if (promptInputElement) {
      if (element.type === "image" || element.type === "file") {
        acc.push({ type: "image_url", image_url: { url: promptInputElement } });
      } else {
        promptData[element.name] = promptInputElement;
      }
    }
    return acc;
  }, []);
  // if lead components has any image then
  return await callTextLLM(leadMagnet, [...finalPayload, { type: "text", text: JSON.stringify(promptData) }]);
};
