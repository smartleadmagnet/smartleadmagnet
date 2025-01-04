import { getImageLLMModel, getTextLLMModel } from "./index";
import { HumanMessage, SystemMessage } from "@langchain/core/messages";
import { LeadMagnet } from "@smartleadmagnet/database";
import pdfParse from 'pdf-parse';

const totalRetry = 1;

const resultFormat = `
The output should be inside <lead> html tag e.g. <lead>the response out</lead>
`;

const getFormat = (outputType: string) => {
  return `The output type should be ${outputType} format.`;
};

function extractLeadContent(htmlString: string): string | undefined | null {
  const regex = /<lead>([\s\S]*?)<\/lead>/;
  const match = htmlString.match(regex);
  return match && match.length > 1 ? match[1] : null;
}

// Helper function to detect content type from base64 data URL
function detectContentType(dataUrl: string): string | null {
  if (!dataUrl.startsWith('data:')) return null;
  const [header] = dataUrl.split(',');
  const [mimeType] = header?.split(';') ?? [];
  return mimeType?.replace('data:', '') ?? null;
}

// Helper function to extract content from base64 PDF
async function extractPdfContent(base64String: string): Promise<string> {
  try {
    const pdfData = base64String.split(',')[1];
    const buffer = Buffer.from(pdfData ?? '', 'base64');
    const data = await pdfParse(buffer);
    return data.text;
  } catch (error) {
    console.error('Error extracting PDF content:', error);
    throw error;
  }
}

// Process different types of content
async function processContent(dataUrl: string): Promise<{ type: string; content: string }> {
  const contentType = detectContentType(dataUrl);
  if (!contentType) return { type: "text", content: dataUrl };

  if (contentType === 'application/pdf') {
    const extractedText = await extractPdfContent(dataUrl);
    return { type: "text", content: extractedText };
  }

  if (contentType.startsWith('text/')) {
    const base64Content = dataUrl.split(',')[1];
    const textContent = Buffer.from(base64Content ?? '', 'base64').toString('utf8');
    return { type: "text", content: textContent };
  }

  if (contentType.startsWith('image/')) {
    return { type: "image_url", content: dataUrl };
  }

  return { type: "text", content: dataUrl };
}

export async function callTextLLM(leadMagnet: LeadMagnet, promptInput: Record<string, string>) {
  let llmModel = getTextLLMModel(leadMagnet.provider, leadMagnet.model);
  
  const messages = [];
  
  // Process each input value
  for (const [key, value] of Object.entries(promptInput)) {
    if (value.startsWith('data:')) {
      const { type, content } = await processContent(value);
      if (type === "image_url") {
        messages.push({
          type: "image_url",
          image_url: { url: content }
        });
      } else {
        messages.push({
          type: "text",
          text: content
        });
      }
    } else {
      messages.push({
        type: "text",
        text: value
      });
    }
  }

  const outputFormat = getFormat(leadMagnet.output);
  const systemMessages = [
    new SystemMessage(`${leadMagnet.prompt}${outputFormat}${resultFormat}`),
    new HumanMessage({
      content: messages,
    }),
  ];

  console.log(messages);

  let retryCount = 0;
  const llmApiCall: any = async () => {
    try {
      const result = await llmModel.invoke(systemMessages);
      return extractLeadContent(result.content as string);
    } catch (error: any) {
      if (retryCount < totalRetry) {
        retryCount++;
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
