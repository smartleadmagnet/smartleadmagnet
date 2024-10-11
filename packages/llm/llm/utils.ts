import { getImageLLMModel, getTextLLMModel } from "./index";
import { HumanMessage, SystemMessage } from "@langchain/core/messages";

const totalRetry = 1;

function replacePlaceholders(template, values) {
	return template.replace(/{{(.*?)}}/g, (match, key) => {
		return values[key] || match; // Replace with value or keep the placeholder if not found
	});
}

export async function callTextLLM(prompt: string, promptInput: any) {
	console.log({
		promptInput,
	});
	// console.log(promptInput);
	let llmModel = getTextLLMModel();
	const messages = [new SystemMessage(prompt), new HumanMessage({
		content: promptInput
	})];
	let retryCount = 0;
	const llmApiCall: any = async () => {
		try {
			const result = await llmModel.invoke(messages);
			// console.log(result?.content);
			return result.content;
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

export async function callImageLLM(prompt: string, promptInput: any) {
	console.log({
		promptInput,
	});
	// console.log(promptInput);
	let llmModel = getImageLLMModel();
	let retryCount = 0;
	const llmApiCall: any = async () => {
		try {
			const result = await llmModel.invoke(replacePlaceholders(prompt, promptInput));
			// console.log(result?.content);
			return result;
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

