import { BedrockChat } from "@langchain/community/chat_models/bedrock";
import { ChatOpenAI, DallEAPIWrapper } from "@langchain/openai";
import { ChatTogetherAI } from "@langchain/community/chat_models/togetherai";

const timeout = 10 * 10000; // 5 seconds
const maxRetries = 1;

export const getImageLLMModel = (llmType?: string) => {
  if (llmType === "Open AI") {
    return new DallEAPIWrapper({
      n: 1, // Default
      model: "dall-e-3", // Default
      apiKey: process.env.OPEN_AI_KEY,
    });
  }
  throw new Error("LLM not found in configuration");
};

export const getTextLLMModel = (llmType?: string, modelName?: string) => {
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
      openAIApiKey: process.env.OPEN_AI_KEY,
      // verbose: true,
      // streaming: true,
    }).bind({
      timeout: timeout,
    });
  } else if (llmType === "Together AI") {
    return new ChatTogetherAI({
      // TODO get the key from the user
      togetherAIApiKey: process.env.TOGETHER_AI_KEY,
      modelName: modelName ?? "meta-llama/Meta-Llama-3.1-70B-Instruct-Turbo",
      maxRetries: maxRetries,
      // verbose: true,
      // streaming: true,
    }).bind({
      timeout: timeout,
    });
  }

  throw new Error("LLM not found in configuration");
};
