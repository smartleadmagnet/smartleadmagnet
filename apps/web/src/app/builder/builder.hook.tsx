// useBuilder.ts
import { useState } from "react";
import { v4 as uuid } from "uuid";
import { DropResult } from "react-beautiful-dnd";
import { BuilderComponentProps } from "@smartleadmagnet/ui/types/builder";
import { builderItems } from "@smartleadmagnet/ui/lib/constants";

const useBuilder = () => {
  const [elementsList, setElementsList] = useState<BuilderComponentProps[]>([]);
  const [activeTab, setActiveTab] = useState("style-preview");

  const reorder = (
    list: BuilderComponentProps[],
    startIndex: number,
    endIndex: number
  ) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };

  const copy = (
    source: BuilderComponentProps[],
    destination: BuilderComponentProps[],
    droppableSource: DropResult,
    droppableDestination: DropResult
  ) => {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const item = sourceClone[droppableSource.index];
    destClone.splice(droppableDestination.index, 0, { ...item, id: uuid() });
    return destClone;
  };

  const move = (
    source: BuilderComponentProps[],
    destination: BuilderComponentProps[],
    droppableSource: DropResult,
    droppableDestination: DropResult
  ) => {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const [removed] = sourceClone.splice(droppableSource.index, 1);
    destClone.splice(droppableDestination.index, 0, removed);
    const result = {};
    result[droppableSource.droppableId] = sourceClone;
    result[droppableDestination.droppableId] = destClone;
    return result;
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
    activeTab, 
    setActiveTab
  };
};

export default useBuilder;
