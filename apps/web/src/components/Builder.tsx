"use client";

import React from "react";
import { Button } from "@smartleadmagnet/ui/components/ui/button";
import Icon from "@smartleadmagnet/ui/components/icon";
import { Card } from "@smartleadmagnet/ui/components/ui/card";
import EditableInput from "@/components/EditableInput";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@smartleadmagnet/ui/components/ui/tabs";
import {
  DragDropContext,
  Draggable,
  DraggableProvided,
  DraggableStateSnapshot,
  Droppable,
  DroppableProvided,
} from "react-beautiful-dnd";
import useBuilder from "@/hooks/builder.hook"; // Import the custom hook
import { builderItems } from "@smartleadmagnet/ui/lib/constants";
import AIForm from "@/components/AiForm";
import SearchInput from "@smartleadmagnet/ui/components/SearchInput";
import BuilderElement from "@/components/BuilderElement";
import BuilderEditor from "@/components/BuilderEditor";
import EmbedModal from "@/components/EmbedModal";
import BuilderStylePreview from "@/components/BuilderStylePreview";
import BuilderOption from "@/components/BuilderOption";
import { formatDistanceToNow } from "date-fns";
import PurchasePlanDialog from "@smartleadmagnet/ui/components/PurchasePlanDialog";
import { GenerateModal } from "@smartleadmagnet/ui/components/GenerateModal";

export default function Builder({ user }: { user?: any }) {
  const {
    leadMagnet,
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
    name,
    setName,
    creditRequired,
    paymentRequired,
    onPublishLead,
    onClosePaymentModal,
    generateLeadMagnetWithAI,
    defaultTab,
    pathname,
  } = useBuilder(); // Use the custom hook

  const filterItems = (searchTerm: string) => {
    if (!searchTerm) return builderItems;
    return builderItems.map((item) => ({
      ...item,
      children: item.children.filter((child) => child.label.toLowerCase().includes(searchTerm.toLowerCase())),
    }));
  };

  return (
    <>
    
      <Tabs
        defaultValue={defaultTab}
        onValueChange={(value) => {
          router.push(`${pathname}?tab=${value}`);
        }}
      >
        <div className="flex min-h-screen flex-col">
          {/* Header  */}
          <div className="flex items-center justify-between bg-gray-900 p-4 text-white">
            <div className="flex items-center">
              <Button
                className="bg-gray-300 px-4 py-2 text-black shadow-md hover:bg-gray-400"
                onClick={() => {
                  router.push("/my-magnets");
                }}
              >
                ← Back
              </Button>
            </div>
            <div className="flex">
              <EditableInput value={name} setValue={setName} />
            </div>

            <div className="flex items-center">
              <p className="mr-4 font-bold">
                Last Saved ({formatDistanceToNow(new Date(leadMagnet?.updatedAt!), { addSuffix: true })})
              </p>
              <Button className="btn-primary hover:bg-cyan-600" onClick={leadMagnet?.status === "published" ? () => {} : onPublishLead}>
                {leadMagnet?.status === "published" ? "Save" : "Publish"}
              </Button>
            </div>
          </div>
          {/* end Header  */}
          {/* Tabs  */}
          <div className="flex items-center justify-between bg-gray-200 p-4 ">
            <div className="flex items-center"></div>
            <div className="flex space-x-4">
              <TabsList className="grid w-full grid-cols-3 bg-gray-900 text-white">
                <TabsTrigger value="form">Form</TabsTrigger>
                <TabsTrigger value="style-preview" disabled={elementsList?.length === 0}>
                  Style & Preview
                </TabsTrigger>
                <TabsTrigger value="options" disabled={elementsList?.length === 0}>
                  Options
                </TabsTrigger>
              </TabsList>
            </div>
            <div className="flex flex-row items-center justify-center gap-2">
              <div className="relative mr-2">
                <span className="animate-ripple-pulse absolute inline-flex h-full w-full rounded-md bg-blue-500 opacity-75"></span>
                <GenerateModal onGenerate={generateLeadMagnetWithAI} />
              </div>
              <div className="flex items-center">
                <Button
                  className="bg-gray-300 px-4 py-2 text-black shadow-md hover:bg-gray-400"
                  onClick={() => setEmbedOpen(true)}
                >
                  Embed
                </Button>
              </div>
            </div>
          </div>
          <TabsContent value="form">
            <DragDropContext onDragEnd={onDragEnd}>
              <div className="builder-wrapper flex flex-1">
                <aside className="builder-column flex h-screen w-1/4 flex-col p-4">
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
                            <h3 className="mb-2 text-lg font-semibold">{item.title}</h3>
                            {item.children.length > 0 && (
                              <Card className="p-4 shadow-md">
                                <Droppable droppableId={item.dropletId} isDropDisabled={true}>
                                  {(provided: DroppableProvided) => (
                                    <div
                                      className="grid grid-cols-1 gap-2"
                                      ref={provided.innerRef}
                                      {...provided.droppableProps}
                                    >
                                      {item.children.map((child, childIndex) => (
                                        <Draggable key={child.id} draggableId={child.id} index={childIndex}>
                                          {(provided: DraggableProvided, snapshot: DraggableStateSnapshot) => (
                                            <React.Fragment>
                                              <Card
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                className="builder-item"
                                              >
                                                <Icon name={child.icon} height="30px" width="30px" />
                                                <span className="title">{child.label}</span>
                                              </Card>
                                              {snapshot?.isDragging && (
                                                <Card className="builder-item clone">
                                                  <Icon name={child.icon} height="30px" width="30px" />
                                                  {/* @ts-ignore */}
                                                  <span>{child?.title}</span>
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
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </aside>

                <div className="flex flex-1">
                  <main className="drop-area mx-2 flex-1 rounded-lg border-2 border-dashed border-gray-300 bg-gray-100 p-2">
                    <Droppable droppableId="droppable-main">
                      {(provided: DroppableProvided) => (
                        <div ref={provided.innerRef} {...provided.droppableProps} className="drop-area-wrapper h-full">
                          {elementsList.length ? (
                            elementsList.map((item: any, index: number) => (
                              <Draggable key={item.id} draggableId={item.id} index={index}>
                                {(provided: DraggableProvided) => (
                                  <div ref={provided.innerRef} {...provided.draggableProps} className="drag-item">
                                    <div className="handle" {...provided.dragHandleProps}>
                                      <Icon name="drag-handle" height="30px" width="30px" />
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
                            <div className="flex h-full items-center justify-center text-center text-gray-500">
                              <h2 className="text-xl">Drag and drop elements here</h2>
                            </div>
                          )}
                          {provided.placeholder}
                        </div>
                      )}
                    </Droppable>
                  </main>
                  <main className=" flex-1 bg-gray-100  p-4">
                    <AIForm user={user} />
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
            <BuilderOption activeOption={activeOption} setActiveOption={setActiveOption} />
          </TabsContent>
        </div>
      </Tabs>
      <EmbedModal open={embedOpen} setIsOpen={setEmbedOpen} magnetId={leadMagnet.id} />`
      <PurchasePlanDialog
        isOpen={creditRequired || paymentRequired}
        onClose={onClosePaymentModal}
        creditRequired={creditRequired}
        paymentRequired={paymentRequired}
      />
    </>
  );
}
