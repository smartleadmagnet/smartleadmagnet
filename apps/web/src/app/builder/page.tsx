"use client";
import React from "react";
import { Button } from "@smartleadmagnet/ui/components/ui/button";
import Icon from "@smartleadmagnet/ui/components/icon";
import { Card } from "@smartleadmagnet/ui/components/ui/card";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DraggableProvided,
  DroppableProvided,
  DraggableStateSnapshot,
} from "react-beautiful-dnd";
import useBuilder from "./builder.hook"; // Import the custom hook
import { builderItems } from "@smartleadmagnet/ui/lib/constants";
import AIForm from "@smartleadmagnet/ui/components/AiForm";
import BuilderElement from "@smartleadmagnet/ui/components/BuilderElement";

const ButtonBar = () => {
  return (
    <div className="flex items-center justify-between p-4 bg-gray-100">
      <div className="flex items-center">
        <Button className="px-4 py-2 bg-gray-300 text-black shadow-md hover:bg-gray-400">
          ← Back
        </Button>
      </div>
      <div className="flex space-x-4">
        <Button>Builder</Button>
        <Button>Design</Button>
        <Button>Integration</Button>
        <Button>Settings</Button>
      </div>
      <div className="flex items-center">
        <Button className="px-4 py-2 bg-green-600 text-white shadow-md hover:bg-green-700">
          Publish
        </Button>
      </div>
    </div>
  );
};

export default function Builder() {
  const { elementsList, onDragEnd } = useBuilder(); // Use the custom hook

  return (
    <div className="min-h-screen flex flex-col">
      <ButtonBar />

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex flex-1">
          <aside className="w-1/4 p-4 builder-column ">
            <div className="grid gap-4">
              {builderItems.map((item, index) => (
                <div key={index} className="py-2">
                  <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                  <Card className="p-4 shadow-md">
                    <Droppable
                      droppableId={item.dropletId}
                      isDropDisabled={true}
                    >
                      {(provided: DroppableProvided) => (
                        <div
                          className="grid grid-cols-2 gap-2"
                          ref={provided.innerRef}
                          {...provided.droppableProps}
                        >
                          {item.children.map((child, childIndex) => (
                            <Draggable
                              key={child.id}
                              draggableId={child.id}
                              index={childIndex}
                            >
                              {(
                                provided: DraggableProvided,
                                snapshot: DraggableStateSnapshot
                              ) => (
                                <React.Fragment>
                                  <Card
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    className="builder-item"
                                  >
                                    <Icon
                                      name={child.icon}
                                      height="50px"
                                      width="50px"
                                    />
                                    <span>{child.title}</span>
                                  </Card>
                                  {snapshot.isDragging && (
                                    <Card className="builder-item clone">
                                      <Icon
                                        name={child.icon}
                                        height="50px"
                                        width="50px"
                                      />
                                      <span>{child.title}</span>
                                    </Card>
                                  )}
                                </React.Fragment>
                              )}
                            </Draggable>
                          ))}
                        </div>
                      )}
                    </Droppable>
                  </Card>
                </div>
              ))}
            </div>
          </aside>

          <div className="flex flex-1">
            <main className="flex-1 bg-gray-100 p-4 drop-area builder-column">
              <Droppable droppableId="droppable-main">
                {(provided: DroppableProvided) => (
                  <div ref={provided.innerRef} {...provided.droppableProps}>
                    {elementsList.length ? (
                      elementsList.map((item, index) => (
                        <Draggable
                          key={item.id}
                          draggableId={item.id}
                          index={index}
                        >
                          {(provided: DraggableProvided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              className="drag-item"
                            >
                              <div
                                className="handle"
                                {...provided.dragHandleProps}
                              >
                                <Icon
                                  name="drag-handle"
                                  height="50px"
                                  width="50px"
                                />
                              </div>
                              <BuilderElement
                                type={item.type}
                                data={item}
                                editable={true}
                                onEdit={() => console.log("Edit clicked")}
                                onDelete={() => console.log("Delete clicked")}
                              />
                            </div>
                          )}
                        </Draggable>
                      ))
                    ) : (
                      <div className="text-center text-gray-500 border-2 border-dashed border-gray-300 rounded-lg p-6">
  Drag and drop elements here
</div>

                    )}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </main>
            <main className="flex-1 bg-gray-200 p-4 builder-column">
              <h2 className="text-lg font-bold">
                <AIForm />
              </h2>
            </main>
          </div>
        </div>
      </DragDropContext>
    </div>
  );
}
