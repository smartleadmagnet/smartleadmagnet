import { getTextLLMModel } from "../llm";
import { HumanMessage, SystemMessage } from "@langchain/core/messages";

const totalRetry = 1;

const prompt = `You are an AI assistant tasked with generating a lead magnet form based on website information. Your goal is to create a JSON representation of the form elements that would be suitable for the website's audience, along with an output type and prompt for generating content based on the form inputs.

First, carefully read the website information provided in the following tags:

<website_info>
Title: {{WEBSITE_TITLE}}
Description: {{WEBSITE_DESCRIPTION}}
Content: {{WEBSITE_CONTENT}}
</website_info>

Now, follow these steps to generate the lead magnet form:

1. Analyze the website information and identify appropriate form elements for a lead magnet related to the website's topic.

2. For each form element, determine the appropriate type and properties. Use the following available form element types:
   - text_field
   - textarea
   - checkbox
   - select
   - radio-group
   - title
   - subtitle
   - checkbox-group
   - file
   - image
   - paragraph
   - separator
   - radio
   - email
   - website
   - color
   - number

3. Generate a JSON array containing objects for each form element, following this structure:
   [
     {
       "label": "Element Label",
       "icon": "element_type",
       "type": "element_type",
       "id": "unique_id",
       "formElement": true,
       "name": "element_name",
       // Additional properties as needed
     },
     // More elements...
   ]

4. Ensure that each element has a unique "id" (you can use a UUID-like format).

5. Include an email form element for collecting user contact information.

6. For elements with options (e.g., radio, select), include an "options" array with label and value for each option.

7. Add properties for each form element type as specified in the lead-ai-create.ts file.

8. Determine the appropriate output type based on the website's content. This could be one of the following:
   - image
   - text
   - code
   - markdown

9. Create a prompt that will use the form fields to generate the desired output. Use the "name" property of the relevant form fields in the prompt.

10. Add two additional properties to the JSON output:
    - outputType: The type of output determined in step 8
    - prompt: The prompt created in step 9

11. Review the generated JSON to ensure it aligns with the website's theme and target audience.

Provide your final output within <lead_magnet_form> tags. The output should be a valid JSON object containing an array of form elements (under the "components" key) and the additional outputType and prompt properties.

Example output structure:
<lead_magnet_form>
{
  "outputType": "text",
  "prompt": "Create a comprehensive guide on {{topic_1}} focusing on {{subtopic_1}} and {{subtopic_2}}. Include practical tips for {{audience_1}}.",
  "components": [
    {
      "label": "Title",
      "value": "Get Your Free Guide",
      "icon": "title",
      "type": "title",
      "id": "a1b2c3d4-e5f6-7g8h-9i0j-k1l2m3n4o5p",
      "name": "title_1"
    },
    {
      "label": "Main Topic",
      "icon": "text_field",
      "type": "text_field",
      "id": "b2c3d4e5-f6g7-8h9i-0j1k-l2m3n4o5p6q",
      "formElement": true,
      "name": "topic_1",
      "placeholder": "Enter the main topic you're interested in",
      "required": true
    },
    {
      "label": "Subtopics",
      "icon": "checkbox-group",
      "type": "checkbox-group",
      "id": "c3d4e5f6-g7h8-9i0j-1k2l-m3n4o5p6q7r",
      "formElement": true,
      "name": "subtopics",
      "options": [
        {"label": "Subtopic 1", "value": "subtopic_1"},
        {"label": "Subtopic 2", "value": "subtopic_2"},
        {"label": "Subtopic 3", "value": "subtopic_3"}
      ],
      "required": true
    },
    {
      "label": "Your Role",
      "icon": "select",
      "type": "select",
      "id": "d4e5f6g7-h8i9-0j1k-2l3m-n4o5p6q7r8s",
      "formElement": true,
      "name": "audience_1",
      "options": [
        {"label": "Beginner", "value": "beginner"},
        {"label": "Intermediate", "value": "intermediate"},
        {"label": "Expert", "value": "expert"}
      ],
      "required": true
    },
    {
      "label": "Email",
      "icon": "email",
      "type": "email",
      "id": "e5f6g7h8-i9j0-1k2l-3m4n-o5p6q7r8s9t",
      "formElement": true,
      "name": "email_1",
      "placeholder": "Enter your email address",
      "required": true
    }
  ]
}
</lead_magnet_form>

Ensure that your output is a valid JSON object and that all required properties are included for each form element.`;

function extractLeadContent(htmlString: string): string | undefined | null {
  const regex = /<lead_magnet_form>([\s\S]*?)<\/lead_magnet_form>/;
  const match = htmlString.match(regex);

  return match && match.length > 1 ? match[1] : null;
}

export const suggestLeadMagnet = async ({
  title,
  description,
  content,
}: {
  title: string;
  description: string;
  content: string;
}) => {
  let llmModel = getTextLLMModel("Google Cloud", "models/gemini-1.5-pro");
  const messages = [
    new SystemMessage(prompt),
    new HumanMessage({
      content: JSON.stringify({ WEBSITE_TITLE: title, WEBSITE_DESCRIPTION: description, WEBSITE_CONTENT: content }),
    }),
  ];
  let retryCount = 0;
  const llmApiCall: any = async () => {
    try {
      const result = await llmModel.invoke(messages);
      const content = extractLeadContent(result.content as string);
      if (content) {
        return JSON.parse(content);
      } else {
        throw new Error("Failed to generate the lead magnet form from the AI model");
      }
    } catch (error: any) {
      if (retryCount < totalRetry) {
        retryCount++;
        return llmApiCall();
      }
      throw new Error("Failed to generate the lead magnet form from the AI model");
    }
  };
  return llmApiCall();
};
