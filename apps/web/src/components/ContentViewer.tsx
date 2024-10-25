import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { solarizedlight } from "react-syntax-highlighter/dist/esm/styles/prism";
import { marked } from "marked"; // Import marked
import { Download,Image,Code,Text,CopyIcon } from "lucide-react"; // Icons from lucide-react
import Spinner from "@smartleadmagnet/ui/components/Spinner";

interface ContentViewerProps {
  type: "text" | "markdown" | "code" | "image";
  content: string;
  isLoading?: boolean;
}

const ContentViewer: React.FC<ContentViewerProps> = ({ type, content,isLoading }) => {
  // Function to copy content to clipboard
  const copyToClipboard = () => {
    navigator.clipboard.writeText(content).then(
      () => {
        alert("Content copied to clipboard!");
      },
      (err) => {
        console.error("Error copying content: ", err);
      }
    );
  };
  // Function to download the image
  const downloadImage = async () => {
    const a = document.createElement("a");
    a.href = content;
    a.download = "image.png";
    a.target = "_blank";
    a.click();
    a.remove();
  };
  
  

  return (
    <>
    {!isLoading ?(
    <div className="rounded-lg bg-white p-4 shadow-lg border">
      {type === "text" && (
        <div className="prompt-content-box">
          <button onClick={copyToClipboard} className="mt-2 rounded bg-blue-500 p-2 text-white hover:bg-blue-600">
          <CopyIcon className="h-5 w-5" />
          </button>
          <div className="text-gray-700">{content}</div>
        </div>
      )}

      {type === "markdown" && (
        <>
          <div className="prose" dangerouslySetInnerHTML={{ __html: marked(content) }} />
          <button onClick={copyToClipboard} className="mt-2 rounded bg-blue-500 p-2 text-white hover:bg-blue-600">
            Copy
          </button>
        </>
      )}

      {type === "code" && (
        <>
          <SyntaxHighlighter language="typescript" style={solarizedlight}>
            {content}
          </SyntaxHighlighter>
          <button onClick={copyToClipboard} className="mt-2 rounded bg-blue-500 p-2 text-white hover:bg-blue-600">
            Copy
          </button>
        </>
      )}

      {type === "image" && (
        <div className="prompt-image-box">
          <button className="downlaod-btn" onClick={downloadImage}>
            <Download className="h-5 w-5"  />
            </button>
            <img src={content} alt="Content" className="h-auto max-w-full rounded-lg" />
          
        </div>
      )}
      
    </div>
    ):(
    <div className="prompt-loader bg-gray-900 w-[100%]">
      <Spinner/>
      <div className="prompt-icon">
      {type === "image"  && <Image className="h-8 w-8" />}
      {type === "text"  && <Text className="h-8 w-8" />}  
      {type === "code"  && <Code className="h-8 w-8" />} 
      {type === "markdown"  && <Text className="h-8 w-8" />}   
      
      
      </div>
      </div>
    )}  
    </>
  );
};

export default ContentViewer;
