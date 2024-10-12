import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { solarizedlight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { marked } from 'marked'; // Import marked

interface ContentViewerProps {
  type: 'text' | 'markdown' | 'code' | 'image';
  content: string;
}

const ContentViewer: React.FC<ContentViewerProps> = ({type, content}) => {
  // Function to copy content to clipboard
  const copyToClipboard = () => {
    navigator.clipboard.writeText(content).then(() => {
      alert('Content copied to clipboard!');
    }, (err) => {
      console.error('Error copying content: ', err);
    });
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-lg">
      {type === 'text' && (
        <>
          <p className="text-gray-700">{content}</p>
          <button onClick={copyToClipboard} className="mt-2 p-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            Copy
          </button>
        </>
      )}

      {type === 'markdown' && (
        <>
          <div
            className="prose"
            dangerouslySetInnerHTML={{__html: marked(content)}}
          />
          <button onClick={copyToClipboard} className="mt-2 p-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            Copy
          </button>
        </>
      )}

      {type === 'code' && (
        <>
          <SyntaxHighlighter language="typescript" style={solarizedlight}>
            {content}
          </SyntaxHighlighter>
          <button onClick={copyToClipboard} className="mt-2 p-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            Copy
          </button>
        </>
      )}

      {type === 'image' && (
        <div className='text-center'>
          <img
            src={content}
            alt="Content"
            className="max-w-full h-auto rounded-lg"
          />
        </div>
      )}
    </div>
  );
};

export default ContentViewer;
