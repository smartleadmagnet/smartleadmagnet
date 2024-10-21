import React, { useEffect } from 'react';

interface DynamicStylesProps {
    cssContent: string;
    enableCustomCss: boolean;

    }

const DynamicStyles = ({ cssContent,enableCustomCss }:DynamicStylesProps) => {
  useEffect(() => {
    if (cssContent && enableCustomCss) {
      // Parse the JSON stringified CSS content
      const parsedCss = cssContent;
      console.log(parsedCss);

      // Create a style tag and append the parsed CSS content
      const style = document.createElement('style');
      style.type = 'text/css';
      style.setAttribute('data-testid', 'dynamic-styles');

      style.innerHTML = parsedCss;
      document.head.appendChild(style);

      return () => {
        // Cleanup: Remove the dynamically added style tag when component unmounts
        document.head.removeChild(style);
      };
    }
  }, [cssContent,enableCustomCss]);

  return null; // This component doesn't render any visible UI
};

export default DynamicStyles;
