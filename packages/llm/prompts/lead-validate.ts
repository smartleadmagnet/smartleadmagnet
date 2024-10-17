import { callImageLLM, callTextLLM } from "../llm/utils";
import { LeadMagnet } from "@smartleadmagnet/database";

export const validateLeadWithInput = async ({
  leadMagnet,
  promptInput,
}: {
  leadMagnet: LeadMagnet;
  promptInput: any;
}) => {
  if (leadMagnet?.output === "image") {
    return await callImageLLM(leadMagnet, promptInput);
  }

  const promptData = {};
  const finalPayload = leadMagnet?.components?.reduce((acc, element) => {
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
  console.log([...finalPayload, { type: "text", text: JSON.stringify(promptData) }]);
  // if lead components has any image then
  return await callTextLLM(leadMagnet, [...finalPayload, { type: "text", text: JSON.stringify(promptData) }]);
};
