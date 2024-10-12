"use client";

import React from "react";
import { Button } from "@smartleadmagnet/ui/components/ui/button";
import Icon from "@smartleadmagnet/ui/components/icon";
import { Card } from "@smartleadmagnet/ui/components/ui/card";
import EditableInput from "@/components/EditableInput";
import { LeadMagnet } from "@smartleadmagnet/database";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@smartleadmagnet/ui/components/ui/tabs";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DraggableProvided,
  DroppableProvided,
  DraggableStateSnapshot,
} from "react-beautiful-dnd";
import useBuilder from "@/hooks/builder.hook"; // Import the custom hook
import {
  builderItems,
} from "@smartleadmagnet/ui/lib/constants";
import AIForm from "@/components/AiForm";
import SearchInput from "@smartleadmagnet/ui/components/SearchInput";
import BuilderElement from "@/components/BuilderElement";
import BuilderEditor from "@/components/BuilderEditor";
import EmbedModal from "@/components/EmbedModal";
import BuilderStylePreview from "@/components/BuilderStylePreview";
import BuilderOption from "@/components/BuilderOption";

export default function Builder({ leadMagnet }: { leadMagnet: LeadMagnet }) {
  const {
    elementsList,
    onDragEnd,
    removeElement,
    handleEdit,
    selectedItem,
    handleEditChange,
    searchTerm,
    handleStyleUpdate,
    formStyles,
    setSearchTerm,
    editMode,
    selectedView,
    setSelectedView,
    textContent,
    markdownContent,
    codeContent,
    embedOpen,
    setEmbedOpen,
    activeOption,
    setActiveOption,
    imageUrl,
    router,
    formName,
    setFormName,
  } = useBuilder({ leadMagnet }); // Use the custom hook

  const filterItems = (searchTerm: string) => {
    if (!searchTerm) return builderItems;
    return builderItems.map((item) => ({
      ...item,
      children: item.children.filter((child) =>
        child.label.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    }));
  };

  return (
    <>
      <Tabs defaultValue="form">
        <div className="min-h-screen flex flex-col">
          {/* Header  */}
          <div className="flex items-center justify-between p-4 bg-gray-900 text-white">
            <div className="flex items-center">
              <Button
                className="px-4 py-2 bg-gray-300 text-black shadow-md hover:bg-gray-400"
                onClick={() => {
                  router.push("/my-forms");
                }}
              >
                ← Back
              </Button>
            </div>
            <div className="flex">
              <EditableInput value={formName} setValue={setFormName} />
            </div>

            <div className="flex items-center">
              <p className="mr-4 font-bold">Last Saved (2 min ago)</p>
              <Button className="btn-primary ">Publish</Button>
            </div>
          </div>
          {/* end Header  */}
          {/* Tabs  */}
          <div className="flex items-center justify-between p-4 bg-gray-200 ">
            <div className="flex items-center"></div>
            <div className="flex space-x-4">
              <TabsList className="grid w-full grid-cols-3 bg-gray-900 text-white">
                <TabsTrigger value="form">Form</TabsTrigger>
                <TabsTrigger
                  value="style-preview"
                  disabled={elementsList?.length === 0}
                >
                  Style & Preview
                </TabsTrigger>
                <TabsTrigger
                  value="options"
                  disabled={elementsList?.length === 0}
                >
                  Options
                </TabsTrigger>
              </TabsList>
            </div>
            <div className="flex flex-row justify-center items-center gap-2">
              <div className="relative mr-2">
                <span
                  className="absolute inline-flex h-full w-full rounded-md bg-blue-500 opacity-75 animate-ripple-pulse"></span>
                <Button
                  className="relative btn btn-primary flex items-center px-4 py-2"
                >
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    viewBox="0 0 24 24"
                    className="text-lg"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    {/* Icon */}
                    <path
                      d="m11 4-.5-1-.5 1-1 .125.834.708L9.5 6l1-.666 1 .666-.334-1.167.834-.708zm8.334 10.666L18.5 13l-.834 1.666-1.666.209 1.389 1.181L16.834 18l1.666-1.111L20.166 18l-.555-1.944L21 14.875zM6.667 6.333 6 5l-.667 1.333L4 6.5l1.111.944L4.667 9 6 8.111 7.333 9l-.444-1.556L8 6.5zM3.414 17c0 .534.208 1.036.586 1.414L5.586 20c.378.378.88.586 1.414.586s1.036-.208 1.414-.586L20 8.414c.378-.378.586-.88.586-1.414S20.378 5.964 20 5.586L18.414 4c-.756-.756-2.072-.756-2.828 0L4 15.586c-.378.378-.586.88-.586 1.414zM17 5.414 18.586 7 15 10.586 13.414 9 17 5.414z"></path>
                  </svg>
                  <span className="mx-2">Generate tool with AI</span>
                </Button>
              </div>
              <div className="flex items-center">
                <Button
                  className="px-4 py-2 bg-gray-300 text-black shadow-md hover:bg-gray-400"
                  onClick={() => setEmbedOpen(true)}
                >
                  Embed
                </Button>
              </div>
            </div>
          </div>
          <TabsContent value="form">
            <DragDropContext onDragEnd={onDragEnd}>
              <div className="flex flex-1 builder-wrapper">
                <aside className="flex flex-col w-1/4 p-4 builder-column h-screen">
                  <div className="mb-4">
                    <SearchInput
                      placeholder="Search for form and layout elements."
                      value={searchTerm}
                      onChange={(value) => {
                        setSearchTerm(value);
                      }}
                    />
                  </div>
                  <div className="flex-grow overflow-y-auto pb-[50px]">
                    {editMode ? (
                      <BuilderEditor
                        data={selectedItem}
                        onClose={() => {
                          handleEdit(null);
                        }}
                        updateData={handleEditChange}
                      />
                    ) : (
                      <div className="grid gap-4">
                        {filterItems(searchTerm).map((item, index) => (
                          <div key={index} className="py-2">
                            <h3 className="text-lg font-semibold mb-2">
                              {item.title}
                            </h3>
                            {item.children.length > 0 && (
                              <Card className="p-4 shadow-md">
                                <Droppable
                                  droppableId={item.dropletId}
                                  isDropDisabled={true}
                                >
                                  {(provided: DroppableProvided) => (
                                    <div
                                      className="grid grid-cols-1 gap-2"
                                      ref={provided.innerRef}
                                      {...provided.droppableProps}
                                    >
                                      {item.children.map(
                                        (child, childIndex) => (
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
                                                    height="30px"
                                                    width="30px"
                                                  />
                                                  <span className="title">{child.label}</span>
                                                </Card>
                                                {snapshot?.isDragging && (
                                                  <Card className="builder-item clone">
                                                    <Icon
                                                      name={child.icon}
                                                      height="30px"
                                                      width="30px"
                                                    />
                                                    {/* @ts-ignore */}
                                                    <span>{child?.title}</span>
                                                  </Card>
                                                )}
                                              </React.Fragment>
                                            )}
                                          </Draggable>
                                        )
                                      )}
                                    </div>
                                  )}
                                </Droppable>
                              </Card>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </aside>

                <div className="flex flex-1">
                  <main className="flex-1 bg-gray-100 drop-area builder-column border-dashed border-2 border-gray-300 rounded-lg mx-2 p-2">
                    <Droppable droppableId="droppable-main">
                      {(provided: DroppableProvided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.droppableProps}
                          className="h-full"
                        >
                          {elementsList.length ? (
                            elementsList.map((item: any, index: number) => (
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
                                      updateData={handleEditChange}
                                      onEdit={() => {
                                        handleEdit(item);
                                      }}
                                      onDelete={() => removeElement(item.id)}
                                    />
                                  </div>
                                )}
                              </Draggable>
                            ))
                          ) : (
                            <div className="text-center h-full justify-center items-center flex text-gray-500">
                              <h2 className="text-xl">
                                Drag and drop elements here
                              </h2>
                            </div>
                          )}
                          {provided.placeholder}
                        </div>
                      )}
                    </Droppable>
                  </main>
                  <main className="flex-1 bg-gray-100 p-4  builder-column">
                    <AIForm leadMagnet={leadMagnet} />
                  </main>
                </div>
              </div>
            </DragDropContext>
          </TabsContent>
          <TabsContent value="style-preview">
            <BuilderStylePreview
              elementsList={elementsList}
              formStyles={formStyles}
              handleStyleUpdate={handleStyleUpdate}
              selectedView={selectedView}
              setSelectedView={setSelectedView}
              textContent={textContent}
              markdownContent={markdownContent}
              codeContent={codeContent}
              imageUrl={imageUrl}
              handleEdit={handleEdit}
              handleEditChange={handleEditChange}
              removeElement={removeElement}
            />
          </TabsContent>
          <TabsContent value="options">
            <BuilderOption activeOption={activeOption} setActiveOption={setActiveOption} leadMagnet={leadMagnet} />
          </TabsContent>
        </div>
      </Tabs>
      <EmbedModal open={embedOpen} setIsOpen={setEmbedOpen} />
    </>
  );
}
