import React from "react";
import StyleEditor from "react-style-editor";

interface CustomCssEditorProps {
  customCss: string;
  onCssChange: (newCss: string) => void;
}

const CustomCssEditor: React.FC<CustomCssEditorProps> = ({ customCss, onCssChange }) => {
  const handleCssChange = (newValue: string) => {
    console.log("CSS Updated: ", newValue);
    onCssChange(newValue);
  };

  return (
    <div>
      <h3>Custom CSS Editor</h3>
      <StyleEditor
        defaultValue={customCss}
        onChange={(value: string) => handleCssChange(value)}
        options={{
          fontSize: 14,
          lineNumbers: true,
          theme: 'default', // You can change the theme here
        }}
        style={{
          width: '100%',
          height: '300px',
          backgroundColor: '#f5f5f5',
          borderRadius: '5px',
          padding: '10px',
        }}
      />
    </div>
  );
};

export default CustomCssEditor;
