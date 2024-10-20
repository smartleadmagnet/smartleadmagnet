import React from "react";
import Editor from "@monaco-editor/react";

const CssEditor = ({ customCss, onCssChange }) => {
  const handleEditorChange = (value) => {
    console.log(value);
    onCssChange(value);
  };

  return (
    <Editor
      height="500px"
      defaultLanguage="css"
      theme="vs-dark" // You can change this to any other available Monaco theme
      value={customCss}
      onChange={handleEditorChange}
      options={{
        minimap: { enabled: false },
        automaticLayout: true, // Ensure the editor adjusts to the container size automatically
      }}
    />
  );
};

export default CssEditor;
