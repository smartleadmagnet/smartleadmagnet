import React, { useState } from "react";
import { LightAsync as SyntaxHighlighter } from "react-syntax-highlighter";
import { css } from "react-syntax-highlighter/dist/esm/languages/hljs";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";

// Register CSS as a language for syntax highlighting
SyntaxHighlighter.registerLanguage("css", css);

interface CustomCssEditorProps {
  customCss: string;
  onCssChange: (newCss: string) => void;
}

const CustomCssEditor: React.FC<CustomCssEditorProps> = ({ customCss, onCssChange }) => {
  const [cssValue, setCssValue] = useState(customCss);

  const handleCssChange = (newValue: string) => {
    setCssValue(newValue);
    onCssChange(newValue);
  };

  return (
    <div>
      <div className="css-editor-container">
        <SyntaxHighlighter
          language="css"
          style={docco}
          customStyle={{
            background: "#f5f5f5",
            borderRadius: "5px",
            padding: "10px",
          }}
          showLineNumbers
          wrapLines
          wrapLongLines
          codeTagProps={{ contentEditable: true }}
          onChange={(e: any) => handleCssChange(e.target.innerText)} // Update CSS when edited
        >
          {cssValue}
        </SyntaxHighlighter>
      </div>
    </div>
  );
};

export default CustomCssEditor;
