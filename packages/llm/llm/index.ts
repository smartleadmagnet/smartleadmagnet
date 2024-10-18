import { BedrockChat } from "@langchain/community/chat_models/bedrock";
import { ChatOpenAI, DallEAPIWrapper } from "@langchain/openai";
import { ChatTogetherAI } from "@langchain/community/chat_models/togetherai";
import { LeadMagnet } from "@smartleadmagnet/database";
import Together from "together-ai";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";

const timeout = 10 * 10000; // 5 seconds
const maxRetries = 1;
const totalRetry = 3;

export function replacePlaceholders(template, values) {
  // Regex to match the whole @[{{number_1}}](number_1) pattern
  return template.replace(/@\[\{\{(.*?)\}\}\]\((.*?)\)/g, (match, key) => {
    return values[key] || match; // Replace with value from object or keep the pattern if not found
  });
}

export const getImageLLMModel = async (leadMagnet: LeadMagnet, promptInput: any, apiKey?: string | null) => {
  const promptText = replacePlaceholders(leadMagnet.prompt, promptInput);
  if (leadMagnet.provider === "Open AI") {
    // console.log(promptInput);
    const llmModel = new DallEAPIWrapper({
      n: 1, // Default
      model: "dall-e-3", // Default
      apiKey: apiKey || process.env.OPEN_AI_KEY,
    });
    let retryCount = 0;
    const llmApiCall: any = async () => {
      try {
        const result = await llmModel.invoke(replacePlaceholders(leadMagnet.prompt, promptInput));
        return result;
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
  } else if (leadMagnet.provider === "Together AI") {
    const together = new Together({ apiKey: process.env.TOGETHER_AI_KEY });
    const response = await together.images.create({
      model: leadMagnet?.model ?? "black-forest-labs/FLUX.1-schnell",
      prompt: promptText,
      width: 1024,
      height: 768,
      steps: 4,
      n: 1,
      // response_format: "b64_json",
    });
    return response.data[0]?.url;
  } else {
    throw new Error("LLM not found in configuration");
  }
};

export const getTextLLMModel = (llmType?: string, modelName?: string, apiKey?: string | null) => {
  if (llmType === "AWS BedRock") {
    return new BedrockChat({
      model: modelName ?? "anthropic.claude-3-5-sonnet-20240620-v1:0", // model: "anthropic.claude-3-5-sonnet-20240620-v1:0",
      temperature: 0.5,
      maxRetries: maxRetries,
      region: process.env.BEDROCK_AWS_REGION,
      credentials: {
        accessKeyId: process.env.BEDROCK_AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.BEDROCK_AWS_SECRET_ACCESS_KEY!,
      },
      // verbose: true,
      // streaming: true,
    }).bind({
      timeout: timeout,
    });
  } else if (llmType === "Open AI") {
    return new ChatOpenAI({
      model: modelName ?? "gpt-4o-mini",
      temperature: 0.5,
      maxRetries: maxRetries,
      // TODO get the key from the user
      openAIApiKey: apiKey || process.env.OPEN_AI_KEY,
      // verbose: true,
      // streaming: true,
    }).bind({
      timeout: timeout,
    });
  } else if (llmType === "Together AI") {
    return new ChatTogetherAI({
      togetherAIApiKey: apiKey || process.env.TOGETHER_AI_KEY,
      modelName: modelName ?? "meta-llama/Meta-Llama-3.1-70B-Instruct-Turbo",
      maxRetries: maxRetries,
      // verbose: true,
      // streaming: true,
    }).bind({
      timeout: timeout,
    });
  } else if (llmType === "Google Cloud") {
    return new ChatGoogleGenerativeAI({
      apiKey: apiKey || process.env.GOOGLE_GEMINI_API_KEY,
      model: modelName ?? "gemini-pro",
      maxOutputTokens: 2048,
      streamUsage: false,
    }).bind({
      timeout: timeout,
    });
  }

  throw new Error("LLM not found in configuration");
};
