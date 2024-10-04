// useBuilder.ts
import { useState } from "react";
import { v4 as uuid } from "uuid";
import { DropResult } from "react-beautiful-dnd";
import { ChildItem } from "../types/builder";
import { builderItems } from "@smartleadmagnet/ui/lib/constants";
import { useLayoutContext } from "../context/LayoutContext";

const useBuilder = () => {
  const { elementsList, setElementsList } = useLayoutContext();
  const [selctedItem, setSelectedItem] = useState<ChildItem | null>(null);

  const [selectedFormStyle, setSelectedFormStyle] = useState("default");

  const [formStyles, setFormStyles] = useState({
    textColor: "#000000",
    backgroundColor: "#ffffff",
    buttonColor: "#000000",
    buttonTextColor: "#ffffff",
    labelColor: "#000000",
    buttonText: "Submit",
  });

  const removeElement = (id: string) => {
    const newList = elementsList.filter((element) => element.id !== id);
    setElementsList(newList);
  };

  const handleEdit = (item: ChildItem | null) => {
    setSelectedItem(item);
  };

  const handleEditChange = (key: string, value: string | boolean) => {
    if (!selctedItem) return;

    const index = elementsList.findIndex(
      (element) => element.id === selctedItem.id
    );
    if (index === -1) return;

    const updatedItem = { ...selctedItem, [key]: value };

    setElementsList((prevList) =>
      prevList.map((item, i) => (i === index ? updatedItem : item))
    );

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
    selectedFormStyle,
    setSelectedFormStyle,
    removeElement,
    handleEdit,
    selctedItem,
    handleEditChange,
  };
};

export default useBuilder;
