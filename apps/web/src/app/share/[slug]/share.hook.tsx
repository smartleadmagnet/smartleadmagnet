// useBuilder.ts
import { useState } from "react";

import { ChildItem } from "@/app/types/builder";
import { useLayoutContext } from "@/app/context/LayoutContext";

const useShare = () => {
  const { elementsList, setElementsList } = useLayoutContext();
  const [selectedView, setSelectedView] = useState("Form");
  const textContent =
    "This is a plain text example. It is used to demonstrate how plain text can be presented without any formatting or special characters.";
  const markdownContent = `
  # Markdown Example
  
  This is a simple markdown example with various elements:
  
  ## Subheading
  
  Here is a list of items:
  
  - Item 1
  - Item 2
  - Item 3
    - Subitem 3.1
    - Subitem 3.2
  
  ### More Formatting
  
  You can also add **bold text**, *italic text*, and even [links](https://www.example.com).
  
  1. First ordered item
  2. Second ordered item
  3. Third ordered item
     - Nested item
  `;

  const codeContent = `const greet = (name) => {
    console.log("Hello, " + name);
  }`;
  const imageUrl =
    "https://smartleadmagnet.com/wp-content/uploads/2024/09/ai-help.jpg"; // Replace with your image URL

  const [formStyles, setFormStyles] = useState({
    textColor: "#333333", // Dark gray for text
    backgroundColor: "#f9f9f9", // Light gray for background
    buttonColor: "#4CAF50", // Green for buttons (pleasant and eye-catching)
    buttonTextColor: "#ffffff", // White text on buttons for contrast
    labelColor: "#666666", // Medium gray for labels (subtle but visible)
    titleColor: "#2C3E50", // Dark blue for titles (professional feel)
    subtitleColor: "#34495E", // Slightly lighter blue for subtitles
    buttonText: "Submit", // Button text
    selectedFont: "Open Sans", // Default font
    selectedFormStyle: "default", // Default form style
  });

  const removeElement = (id: string) => {
    const newList = elementsList.filter((element) => element.id !== id);
    setElementsList(newList);
  };

  const handleEdit = (item: ChildItem | null) => {
    setSelectedItem(item);
    setEditMode(item ? true : false);
  };

  const handleEditChange = (
    key: string,
    value: string | boolean,
    builderSelected?: ChildItem
  ) => {
    //write your code here
    // Update the elements list with the modified item
  };

  return {
    elementsList,
    removeElement,
    handleEdit,
    handleEditChange,
    formStyles,
    selectedView,
    imageUrl,
    textContent,
    markdownContent,
    codeContent,
  };
};

export default useShare;
