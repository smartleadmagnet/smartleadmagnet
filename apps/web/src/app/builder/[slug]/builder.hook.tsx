// useBuilder.ts
import { useState } from "react";
import { v4 as uuid } from "uuid";
import { DropResult } from "react-beautiful-dnd";
import { ChildItem } from "@/app/types/builder";
import { builderItems } from "@smartleadmagnet/ui/lib/constants";
import { useLayoutContext } from "@/app/context/LayoutContext";

const useBuilder = () => {
  const { elementsList, setElementsList } = useLayoutContext();
  const [selectedItem, setSelectedItem] = useState<ChildItem | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [embedOpen, setEmbedOpen] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [activeOption, setActiveOption] = useState("info");
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

  const handleStyleUpdate = (key: string, newColor: string) => {
    setFormStyles((prev) => ({
      ...prev,
      [key]: newColor,
    }));
  };

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
    const selctedItemCopy = builderSelected || selectedItem;
    if (!selctedItemCopy) return;

    const index = elementsList.findIndex(
      (element) => element.id === selctedItemCopy.id
    );
    if (index === -1) return;

    let updatedItem = { ...selctedItemCopy, [key]: value };

    // Website validation
    if (selctedItemCopy.type === "website" && key === "value") {
      const websiteRegex =
        /^(https?:\/\/)?([\w\d-]+\.)+\w{2,}(\/[\w\d-]*)*\/?$/;
      const isValidWebsite = websiteRegex.test(value as string);
      if (!isValidWebsite) {
        updatedItem = {
          ...updatedItem,
          error: "Invalid website URL",
        };
      } else {
        updatedItem = {
          ...updatedItem,
          error: "", // Clear error if valid
        };
      }
    }

    // Email validation
    if (selctedItemCopy.type === "email" && key === "value") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const isValidEmail = emailRegex.test(value as string);
      if (!isValidEmail) {
        updatedItem = {
          ...updatedItem,
          error: "Invalid email address",
        };
      } else {
        updatedItem = {
          ...updatedItem,
          error: "", // Clear error if valid
        };
      }
    }

    // Update the elements list with the modified item
    setElementsList((prevList) =>
      prevList.map((item, i) => (i === index ? updatedItem : item))
    );

    // If builderSelected exists, return the updated item
    if (builderSelected) {
      return updatedItem;
    }

    // Otherwise, update the selected item state
    setSelectedItem(updatedItem);
  };

  const generateName = (type: string) => {
    let index = 1;
    let name = `${type}_${index}`;
    while (elementsList.some((element) => element.name === name)) {
      index++;
      name = `${type}_${index}`;
    }
    return name;
  };

  const reorder = (list: ChildItem[], startIndex: number, endIndex: number) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };

  const copy = (
    source: ChildItem[],
    destination: ChildItem[],
    droppableSource: DropResult,
    droppableDestination: DropResult
  ) => {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const item = sourceClone[droppableSource.index];
    const name = generateName(item.type);
    console.log(name);
    destClone.splice(droppableDestination.index, 0, {
      ...item,
      id: uuid(),
      name,
    });
    console.log(destClone);
    return destClone;
  };

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) {
      return; // Do nothing if dropped outside the list
    }

    switch (source.droppableId) {
      case destination.droppableId:
        setElementsList(reorder(elementsList, source.index, destination.index));
        break;
      case "layout_elements":
        setElementsList(
          copy(builderItems[0].children, elementsList, source, destination)
        );
        break;
      case "form_elements":
        setElementsList(
          copy(builderItems[1].children, elementsList, source, destination)
        );
        break;
      default:
        break;
    }
  };

  return {
    elementsList,
    onDragEnd,
    removeElement,
    handleEdit,
    selctedItem: selectedItem,
    handleEditChange,
    searchTerm,
    setSearchTerm,
    editMode,
    handleStyleUpdate,
    formStyles,
    selectedView,
    setSelectedView,
    textContent,
    markdownContent,
    codeContent,
    imageUrl,
    activeOption,
    setActiveOption,
    embedOpen,
    setEmbedOpen,
  };
};

export default useBuilder;
