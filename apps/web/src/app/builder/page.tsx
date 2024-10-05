"use client";
import React from "react";
import { Button } from "@smartleadmagnet/ui/components/ui/button";
import Icon from "@smartleadmagnet/ui/components/icon";
import { Card } from "@smartleadmagnet/ui/components/ui/card";
import { Input } from "@smartleadmagnet/ui/components/ui/input";
import { Label } from "@smartleadmagnet/ui/components/ui/label";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@smartleadmagnet/ui/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@smartleadmagnet/ui/components/ui/accordion";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DraggableProvided,
  DroppableProvided,
  DraggableStateSnapshot,
} from "react-beautiful-dnd";
import useBuilder from "./builder.hook"; // Import the custom hook
import {
  builderItems,
  formStyleOptions,
} from "@smartleadmagnet/ui/lib/constants";
import AIForm from "../components/AiForm";
import SearchInput from "@smartleadmagnet/ui/components/SearchInput";
import BuilderElement from "../components/BuilderElement";
import ColorPicker from "@smartleadmagnet/ui/components/ColorPicker";
import FontSelector from "@smartleadmagnet/ui/components/ui/FontSelector";
import BuilderEditor from "../components/BuilderEditor";





export default function Builder() {
  const { elementsList, onDragEnd, selectedFormStyle, setSelectedFormStyle,removeElement,handleEdit,selctedItem ,handleEditChange} =
    useBuilder(); // Use the custom hook
  const [color, setColor] = React.useState<string>("#ffffff"); // Default color
  const handleColorChange = (newColor: string) => {
    setColor(newColor); // Update the state with the new color
  };

  return (
    <Tabs defaultValue="form">
      <div className="min-h-screen flex flex-col">
        {/* Header  */}
        <div className="flex items-center justify-between p-4 bg-gray-900 text-white">
          <div className="flex items-center">
            <Button className="px-4 py-2 bg-gray-300 text-black shadow-md hover:bg-gray-400">
              ← Back
            </Button>
          </div>
          <div className="flex space-x-4 cm-form-input">
            <Input placeholder="Enter your form name" />
          </div>
          <div className="flex items-center">
            <Button className="px-4 py-2 bg-orange-600  text-white shadow-md hover:bg-orange-700 ">
              Publish
            </Button>
          </div>
        </div>
        {/* end Header  */}
        {/* Tabs  */}
        <div className="flex items-center justify-between p-4 bg-gray-200 ">
          <div className="flex items-center"></div>
          <div className="flex space-x-4">
            <TabsList className="grid w-full grid-cols-3 bg-gray-900 text-white">
              <TabsTrigger value="form">Form</TabsTrigger>
              <TabsTrigger value="options">Options</TabsTrigger>
              <TabsTrigger value="style-preview">Style & Preview</TabsTrigger>
            </TabsList>
          </div>
          <div className="flex items-center">
            <Button className="px-4 py-2 bg-gray-300 text-black shadow-md hover:bg-gray-400">
              Embed
            </Button>
          </div>
        </div>
        <TabsContent value="form">
          <DragDropContext onDragEnd={onDragEnd}>
            <div className="flex flex-1">
              <aside className="w-1/4 p-4 builder-column ">
                {selctedItem !==null? <BuilderEditor data={selctedItem} onClose={()=>{
                  handleEdit(null)
                }}
                updateData={handleEditChange}
                />:(
                  <>
                  <SearchInput placeholder="Search for form and layout elements." />
                <div className="grid gap-4">
                  {builderItems.map((item, index) => (
                    <div key={index} className="py-2">
                      <h3 className="text-lg font-semibold mb-2">
                        {item.title}
                      </h3>
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
                                        <span>{child.label}</span>
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
                  </>

                )} 
                
                
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
                                      height="30px"
                                      width="30px"
                                    />
                                  </div>
                                  <BuilderElement
                                    type={item.type}
                                    data={item}
                                    editable={true}
                                    
                                    onEdit={() => {
                                      handleEdit(item);
                                    }}
                                    onDelete={() =>
                                      removeElement(item.id)
                                    }
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
                <main className="flex-1 bg-gray-100 p-4 drop-area builder-column">
                  <AIForm />
                </main>
              </div>
            </div>
          </DragDropContext>
        </TabsContent>
        <TabsContent value="style-preview">
          <div className="flex flex-1">
            <aside className="w-1/3 p-4 builder-column ">
              <Accordion
                type="single"
                collapsible
                className="w-full"
                defaultValue="item-1"
              >
                <AccordionItem value="item-1">
                  <AccordionTrigger>Input Options</AccordionTrigger>
                  <AccordionContent>
                    <div className="py-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {formStyleOptions.map((item, index) => (
                        <Card
                          key={index}
                          className={`p-4 shadow-md cursor-pointer ${selectedFormStyle === item.value ? "bg-blue-50 border border-blue-300" : ""} form-${item.value}`} // Highlight style
                          onClick={() => setSelectedFormStyle(item.value)} // Set selected item on click
                        >
                          <form>
                            <h3 className="text-lg font-semibold mb-4">
                              {item.title}
                            </h3>
                            {/* Input and Button */}
                            <div className="space-y-4">
                              <Input
                                type="text"
                                placeholder="Enter your form name"
                                className="w-full pointer-events-none "
                              />
                              <Button className="px-4 py-2 bg-orange-600 text-white shadow-md hover:bg-orange-700 pointer-events-none">
                                Submit
                              </Button>
                            </div>
                          </form>
                        </Card>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>Style</AccordionTrigger>
                  <AccordionContent>
                    <Label className="block text-sm font-medium text-gray-700">
                      Font Family
                    </Label>
                    <FontSelector />
                    <ColorPicker
                      label="Label Color"
                      color={color}
                      onChange={handleColorChange}
                    />
                    <ColorPicker
                      label="Label Color"
                      color={color}
                      onChange={handleColorChange}
                    />
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </aside>

            <div className="flex flex-1">
              <main className="flex-1 bg-gray-100 p-4 drop-area builder-column">
                <h3 className="text-lg font-semibold mb-2">Style & Preview</h3>
                {/* add all preview view mobile table and desktop */}
              </main>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="options">
          <div className="flex flex-1">
            <aside className="w-1/4 p-4 builder-column ">
              <SearchInput placeholder="Search for form and layout elements." />
              <div className="grid gap-4"></div>
            </aside>

            <div className="flex flex-1">
              <main className="flex-1 bg-gray-100 p-4 drop-area builder-column">
                <h3 className="text-lg font-semibold mb-2">Options</h3>
              </main>
            </div>
          </div>
        </TabsContent>
      </div>
    </Tabs>
    
  );
}
