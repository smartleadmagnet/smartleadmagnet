import { callImageLLM, callTextLLM } from "../llm/utils";
import { LeadMagnet } from "@smartleadmagnet/database";

export const validateLeadWithInput = async ({
  leadMagnet,
  promptInput,
  apiKey,
}: {
  leadMagnet: LeadMagnet;
  promptInput: Record<string, string>;
  apiKey?: string | null;
}) => {
  if (leadMagnet?.output === "image") {
    return await callImageLLM(leadMagnet, promptInput, apiKey);
  }

  return await callTextLLM(leadMagnet, promptInput);
};
