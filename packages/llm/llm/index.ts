import { BedrockChat } from "@langchain/community/chat_models/bedrock";
import { ChatOpenAI } from "@langchain/openai";
import { DallEAPIWrapper } from "@langchain/openai";


const timeout = 10 * 10000; // 5 seconds
const maxRetries = 1;

export const getImageLLMModel = (llmType?: string) => {
	return new DallEAPIWrapper({
		n: 1, // Default
		model: "dall-e-3", // Default
		apiKey: process.env.OPEN_AI_KEY,
	});
}


export const getTextLLMModel = (llmType?: string) => {
	return new BedrockChat({
		model: "anthropic.claude-3-5-sonnet-20240620-v1:0", // model: "anthropic.claude-3-5-sonnet-20240620-v1:0",
		temperature: 0.5,
		maxRetries: maxRetries,
		maxTokens: 4096,
		region: process.env.BEDROCK_AWS_REGION,
		credentials: {
			accessKeyId: process.env.BEDROCK_AWS_ACCESS_KEY_ID!,
			secretAccessKey: process.env.BEDROCK_AWS_SECRET_ACCESS_KEY!,
		},
		verbose: true,
		streaming: true,
	}).bind({
		timeout: timeout,
	});
	
	// return new ChatOpenAI({
	// 	model: "gpt-4o-mini",
	// 	temperature: 0.5,
	// 	maxRetries: maxRetries,
	// 	maxTokens: 4096,
	// 	openAIApiKey: process.env.OPEN_AI_KEY,
	// 	verbose: true,
	// 	streaming: true,
	// }).bind({
	// 	timeout: timeout,
	// });

	
	throw new Error("LLM not found in configuration");
};
