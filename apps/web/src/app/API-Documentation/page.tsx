import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { solarizedlight } from 'react-syntax-highlighter/dist/esm/styles/prism';

const APIDocumentation = () => {
  const codeFetchRequest = `
const apiKey = 'your_api_key_here';
const appId = 'fa04f53a-da6c-4b08-bca9-87772c3f228c';

const requestBody = {
  id: appId,
  description: "Create a content calendar for our tech company",
  category: "B2B SaaS",
  target_audience: "Small business owners",
  tone: "Friendly and professional",
  platforms: "LinkedIn,Twitter",
  post_frequency: "3x weekly"
};

fetch('https://www.foxyapps.ai/api/app', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': \`Bearer \${apiKey}\`
  },
  body: JSON.stringify(requestBody)
})
.then(response => {
  if (!response.ok) throw new Error(\`Error: \${response.status}\`);
  return response.json();
})
.then(data => {
  console.log('Response from API:', data);
})
.catch(error => {
  console.error('An error occurred:', error);
});
`;

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h1 className="text-3xl font-bold mb-4 text-indigo-600">SmartLeadMagnet API Documentation</h1>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-2 text-gray-700">Getting Started</h2>
          <p className="text-gray-600">
            To get started with FoxyApps, generate your API key from your profile settings. Here’s how:
          </p>
          <ol className="list-decimal list-inside mt-4 text-gray-600">
            <li>Log into your FoxyApps account at <a href="https://app.smartleadmagnet.com/" className="text-indigo-600 hover:underline">https://app.smartleadmagnet.com/</a>.</li>
            <li>Navigate to the API settings at <a href="https://app.smartleadmagnet.com/api" className="text-indigo-600 hover:underline">https://app.smartleadmagnet.com/api</a>.</li>
            <li>Click <strong>Generate new API token</strong>.</li>
          </ol>
          <p className="mt-4 text-gray-500 italic">
            Note: Your API key will only be displayed once, so make sure to save it in a secure location.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-2 text-gray-700">Using the API</h2>
          <p className="text-gray-600">To make a request using your app, follow these steps:</p>
          <ol className="list-decimal list-inside mt-4 text-gray-600">
            <li>Send a POST request to: <span className="bg-gray-100 p-1 rounded text-gray-800">https://app.smartleadmagnet.com/api/app</span></li>
            <li>Include your API key in the request headers (example below).</li>
            <li>Pass the <code>id</code> of your app and any input fields in the request body.</li>
          </ol>

          <SyntaxHighlighter language="javascript" style={solarizedlight} className="mt-4 rounded">
            {`headers: {
  'Content-Type': 'application/json',
  'Authorization': 'Bearer your_api_key',
}`}
          </SyntaxHighlighter>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-2 text-gray-700">Example Request</h2>
          <p className="text-gray-600">Here’s an example of how to send a request using fetch in JavaScript:</p>
          <SyntaxHighlighter language="javascript" style={solarizedlight} className="mt-4 rounded">
            {codeFetchRequest}
          </SyntaxHighlighter>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-2 text-gray-700">Credits and API Key Usage</h2>
          <p className="text-gray-600">
            Depending on your app’s model provider, the API will either use your credits or your own API key. Here's how it works:
          </p>
          <ul className="list-disc list-inside mt-4 text-gray-600">
            <li>If OpenAI is your model provider and you’ve set an OpenAI key, it will use your API key.</li>
            <li>If Anthropic is your model provider, it will use your Anthropic API key.</li>
            <li>Otherwise, the system will consume your credits.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-2 text-gray-700">Error Handling</h2>
          <p className="text-gray-600">Ensure the following to avoid errors:</p>
          <ul className="list-disc list-inside mt-4 text-gray-600">
            <li>Check that you're using the correct app <code>id</code>.</li>
            <li>Make sure all required fields are included in your request.</li>
            <li>Verify that your API key is valid and correctly formatted.</li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default APIDocumentation;
