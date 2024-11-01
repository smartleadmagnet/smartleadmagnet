import { getTextLLMModel } from "../llm";
import { HumanMessage, SystemMessage } from "@langchain/core/messages";

const totalRetry = 1;

const prompt = `You are an AI assistant tasked with generating a lead magnet form based on user requirements. Your goal is to create a JSON representation of the form elements as specified by the user, along with an output type and prompt for generating content based on the form inputs.

First, carefully read the user requirements provided in the following tags:

<user_requirements>
{{USER_REQUIREMENTS}}
</user_requirements>

Now, follow these steps to generate the lead magnet form:

1. Analyze the user requirements and identify the form elements requested.

2. For each form element, determine the appropriate type and properties based on the user's description. Use the following available form element types:
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

5. If the user specifies an optional email address, include an email form element.

6. For elements with options (e.g., radio, select), include an "options" array with label and value for each option.

7. Add properties for each form element type as follows:
   a. For title, subtitle, and paragraph:
      - name
      - value
   b. For separator:
      - No additional properties
   c. For radio, checkbox, select, and radio-group:
      - name (Form Submission Name)
      - label (Form Label for that property)
      - placeholder
      - required (boolean)
      - options (array of objects with label and value)
   d. For all other types:
      - name (Form Submission Name)
      - label (Form Label for that property)
      - placeholder
      - required (boolean)

8. After generating the form elements, determine the appropriate output type based on the user requirements. This could be one of the following:
   - image
   - text
   - code
   - markdown

9. Create a prompt that will use the form fields to generate the desired output. Use the "name" property of the relevant form fields in the prompt.

10. Add two additional properties to the JSON output:
    - outputType: The type of output determined in step 8
    - prompt: The prompt created in step 9

11. Before generating result in the scratchpad check if user needs to upload a file or image for the analysis. If it required, use file or image type in the form elements.

12. Review the generated JSON to ensure all user requirements are met and that the structure is correct.

Provide your final output within <lead_magnet_form> tags. The output should be a valid JSON object containing an array of form elements (under the "components" key) and the additional outputType and prompt properties.

Example output structure:
<lead_magnet_form>
{
  "outputType": "image",
  "prompt": "Create a black and white illustration based on the user's description {{description_1}} for a coloring book.",
  "components": [
  {
    "label": "Title",
    "value": "Create Your Own Coloring Book",
    "icon": "title",
    "type": "title",
    "id": "a1b2c3d4-e5f6-7g8h-9i0j-k1l2m3n4o5p",
    "name": "title_1"
  },
  {
    "label": "Paragraph",
    "icon": "paragraph",
    "type": "paragraph",
    "value": "Describe your vision for a unique coloring book, and we'll create a black and white illustration based on your description. This will allow you to add your own creative touch by coloring it in.",
    "id": "q6r7s8t9-u0v1-2w3x-4y5z-a6b7c8d9e0",
    "name": "paragraph_1"
  },
  {
    "label": "Description",
    "icon": "textarea",
    "type": "textarea",
    "id": "f1g2h3i4-j5k6-7l8m-9n0p-q1r2s3t4u5",
    "formElement": true,
    "name": "description_1",
    "placeholder": "Describe your vision for the coloring book...",
    "required": true
  },
  {
    "label": "Email (Optional)",
    "icon": "email",
    "type": "email",
    "id": "v6w7x8y9-z0a1-b2c3-d4e5-f6g7h8i9j0",
    "formElement": true,
    "name": "email_1",
    "placeholder": "Enter your email address",
    "required": false
  }
]
}
</lead_magnet_form>

Ensure that your output is a valid JSON object and that all required properties are included for each form element.`;

function extractLeadContent(htmlString: string): string | undefined | null {
  const regex = /<lead_magnet_form>([\s\S]*?)<\/lead_magnet_form>/;
  const match = htmlString.match(regex);

  // If a match is found, return the content inside the <lead> tag
  return match && match.length > 1 ? match[1] : null;
}

export const createAILead = async ({ description }: { description: string }) => {
  let llmModel = getTextLLMModel("Google Cloud", "models/gemini-1.5-pro");
  const messages = [
    new SystemMessage(prompt),
    new HumanMessage({
      content: JSON.stringify({ USER_REQUIREMENTS: description }),
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
        throw new Error("Failed to generate the response from the AI model");
      }
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
};
