"use client";

import { useState } from "react";
import { v4 as uuid } from "uuid";
import { DropResult } from "react-beautiful-dnd";
import { ChildItem } from "@/app/types/builder";
import { builderItems } from "@smartleadmagnet/ui/lib/constants";
import { useBuilderContext } from "@/providers/BuilderProvider";
import { useRouter } from "next/navigation";

const useBuilder = () => {
  const { elementsList, setElementsList, setName, name, formStyles, setFormStyles, leadMagnet } = useBuilderContext();
  const router = useRouter();
  const [selectedItem, setSelectedItem] = useState<ChildItem | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [embedOpen, setEmbedOpen] = useState(false);
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
  const imageUrl = "https://smartleadmagnet.com/wp-content/uploads/2024/09/ai-help.jpg"; // Replace with your image URL

  const handleStyleUpdate = (key: string, newColor: string) => {
    setFormStyles((prev) => ({
      ...prev,
      [key]: newColor,
    }));
  };

  const removeElement = (id: string) => {
    const newList = elementsList.filter((element: any) => element.id !== id);
    setElementsList(newList as any);
  };

  const handleEdit = (item: ChildItem | null) => {
    setSelectedItem(item);
    setEditMode(!!item);
  };

  const handleEditChange = (key: string, value: string | boolean, builderSelected?: ChildItem) => {
    const selectedItemCopy = builderSelected || selectedItem;
    if (!selectedItemCopy) return;

    const index = elementsList.findIndex((element: any) => element.id === selectedItemCopy.id);
    if (index === -1) return;

    let updatedItem = { ...selectedItemCopy, [key]: value };

    // Website validation
    if (selectedItemCopy.type === "website" && key === "value") {
      const websiteRegex = /^(https?:\/\/)?([\w\d-]+\.)+\w{2,}(\/[\w\d-]*)*\/?$/;
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
    if (selectedItemCopy.type === "email" && key === "value") {
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
    setElementsList((prevList) => prevList.map((item, i) => (i === index ? updatedItem : item)));

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
    while (elementsList.some((element: any) => element.name === name)) {
      index++;
      name = `${type}_${index}`;
    }
    return name;
  };

  const reorder = (list: ChildItem[], startIndex: number, endIndex: number) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    if (removed) {
      result.splice(endIndex, 0, removed);
    }

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
    if (droppableSource) {
      // TODO need to check
      // @ts-ignore
      const [removed] = sourceClone.splice(droppableSource.index, 1);
      if (removed) {
        // @ts-ignore
        destClone.splice(droppableDestination.index, 0, {
          ...removed,
          id: uuid(),
          name: generateName(removed.type),
        });
      }
    }
    return destClone;
  };

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) {
      return; // Do nothing if dropped outside the list
    }

    switch (source.droppableId) {
      case destination.droppableId:
        setElementsList(reorder(elementsList as any, source.index, destination.index));
        break;
      case "layout_elements":
        if (builderItems?.[0]?.children) {
          // @ts-ignore
          setElementsList(
            // @ts-ignore
            copy(builderItems?.[0]?.children, elementsList, source, destination)
          );
        }

        break;
      case "form_elements":
        if (builderItems?.[1]?.children) {
          // @ts-ignore
          setElementsList(
            // @ts-ignore
            copy(builderItems?.[1]?.children, elementsList, source, destination)
          );
        }
        break;
      default:
        break;
    }
  };

  return {
    leadMagnet,
    elementsList,
    onDragEnd,
    removeElement,
    handleEdit,
    selectedItem,
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
    router,
    name,
    setName,
  };
};

export default useBuilder;
