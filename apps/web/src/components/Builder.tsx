"use client";

import React from "react";
import { Button } from "@smartleadmagnet/ui/components/ui/button";
import Icon from "@smartleadmagnet/ui/components/icon";
import { Card } from "@smartleadmagnet/ui/components/ui/card";
import { Input } from "@smartleadmagnet/ui/components/ui/input";
import { Label } from "@smartleadmagnet/ui/components/ui/label";
import styled from "styled-components";
import ContentViewer from "@/components/ContentViewer";
import SettingsForm from "@/components/SettingsForm";
import WebhookForm from "@/components/WebhookForm";
import EmailForm from "@/components/EmailForm";
import { LeadMagnet } from "@smartleadmagnet/database";

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
import useBuilder from "@/hooks/builder.hook"; // Import the custom hook
import {
	builderItems,
	formStyleOptions,
} from "@smartleadmagnet/ui/lib/constants";
import AIForm from "@/components/AiForm";
import SearchInput from "@smartleadmagnet/ui/components/SearchInput";
import BuilderElement from "@/components/BuilderElement";
import ColorPicker from "@smartleadmagnet/ui/components/ColorPicker";
import FontSelector from "@smartleadmagnet/ui/components/ui/FontSelector";
import BuilderEditor from "@/components/BuilderEditor";
import ResponsiveScreen from "@/components/ResponsiveScreen";
import EmbedModal from "@/components/EmbedModal";


const FormWrapper = styled.div`
  background-color: ${(props) => props.theme.backgroundColor};
  width: 90%;
  max-width: 600px;
  color: ${(props) => props.theme.textColor};
  margin: 0 auto;

  padding: 20px;
  border-radius: 5px;
  font-family: ${(props) => props.theme.selectedFont};
  .form-element {
    margin: 0 0 20px 0;
    padding: 0;
  }

  h1 {
    color: ${(props) => props.theme.titleColor};
  }

  h2 {
    color: ${(props) => props.theme.subtitleColor};
  }

  label {
    color: ${(props) => props.theme.labelColor};
    display: block;
    margin-bottom: 5px;
  }

  input {
    color: ${(props) => props.theme.textColor};
    &:focus {
      border-color: ${(props) => props.theme.buttonColor};
      outline: none;
    }
  }

  button[type="submit"] {
    background-color: ${(props) => props.theme.buttonColor};
    color: ${(props) => props.theme.buttonTextColor};
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;

    &:hover {
      background-color: darken(${(props) => props.theme.buttonColor}, 10%);
    }
  }
`;

export default function Builder({ leadMagnet }: {leadMagnet: LeadMagnet }) {
	const {
		elementsList,
		onDragEnd,
		removeElement,
		handleEdit,
		selctedItem,
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
		embedOpen, setEmbedOpen,
		activeOption, setActiveOption,
		imageUrl,
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
							<Button className="px-4 py-2 bg-gray-300 text-black shadow-md hover:bg-gray-400">
								← Back
							</Button>
						</div>
						<div className="flex space-x-4 cm-form-input">
							<Input placeholder="Enter your form name"/>
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
								<TabsTrigger value="style-preview" disabled={elementsList?.length === 0}>Style & Preview</TabsTrigger>
								<TabsTrigger value="options" disabled={elementsList?.length === 0}>Options</TabsTrigger>
							</TabsList>
						</div>
						<div className="flex items-center">
							<Button className="px-4 py-2 bg-gray-300 text-black shadow-md hover:bg-gray-400"
							        onClick={() => setEmbedOpen(true)}
							>
								Embed
							</Button>
						</div>
					</div>
					<TabsContent value="form">
						<DragDropContext onDragEnd={onDragEnd}>
							<div className="flex flex-1">
								<aside className="w-1/4 p-4 builder-column ">
									{editMode ? (
										<BuilderEditor
											data={selctedItem}
											onClose={() => {
												handleEdit(null);
											}}
											updateData={handleEditChange}
										/>
									) : (
										<>
											<SearchInput
												placeholder="Search for form and layout elements."
												value={searchTerm}
												onChange={(value) => {
													setSearchTerm(value);
												}}
											/>
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
																							{snapshot?.isDragging && (
																								<Card className="builder-item clone">
																									<Icon
																										name={child.icon}
																										height="50px"
																										width="50px"
																									/>
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
										</>
									)}
								</aside>
								
								<div className="flex flex-1">
									<main
										className="flex-1 bg-gray-100 drop-area builder-column border-dashed border-2 border-gray-300 rounded-lg mx-2 p-2">
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
														<div
															className="text-center h-full justify-center items-center flex text-gray-500">
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
									<main className="flex-1 bg-gray-100 p-4 drop-area builder-column">
										<AIForm leadMagnet={leadMagnet} />
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
														className={`p-4 shadow-md cursor-pointer ${formStyles.selectedFormStyle === item.value ? "bg-blue-50 border border-blue-300" : ""} form-${item.value}`} // Highlight style
														onClick={() =>
															handleStyleUpdate("selectedFormStyle", item.value)
														} // Set selected item on click
													>
														<form>
															<h3 className="text-lg font-semibold mb-4">
																{item.label}
															</h3>
															{/* Input and Button */}
															<div className="space-y-4">
																<Input
																	type="text"
																	placeholder="Enter your form name"
																	className="w-full pointer-events-none "
																/>
																<Button
																	className="px-4 py-2 bg-orange-600 text-white shadow-md hover:bg-orange-700 pointer-events-none">
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
											<div className="pb-[20px]">
												<Label className="block text-sm font-medium text-gray-700">
													Font Family
												</Label>
												<FontSelector
													onChange={(fontFamily) => {
														handleStyleUpdate("selectedFont", fontFamily);
													}}
													activeFontFamily={formStyles.selectedFont}
												/>
											</div>
											
											<div className="grid grid-cols-2 grid-rows-4 gap-[10px]">
												<div>
													<ColorPicker
														label="Background Color"
														color={formStyles.backgroundColor}
														onChange={(color) =>
															handleStyleUpdate("backgroundColor", color)
														}
													/>
												</div>
												<div>
													<ColorPicker
														label="Title Color"
														color={formStyles.titleColor}
														onChange={(color) =>
															handleStyleUpdate("titleColor", color)
														}
													/>
												</div>
												<div>
													<ColorPicker
														label="Subtitle Color"
														color={formStyles.subtitleColor}
														onChange={(color) =>
															handleStyleUpdate("subtitleColor", color)
														}
													/>
												</div>
												<div>
													<ColorPicker
														label="Label Color"
														color={formStyles.labelColor}
														onChange={(color) =>
															handleStyleUpdate("labelColor", color)
														}
													/>
												</div>
												<div>
													<ColorPicker
														label="Text Color"
														color={formStyles.textColor}
														onChange={(color) =>
															handleStyleUpdate("textColor", color)
														}
													/>
												</div>
												<div>
													<ColorPicker
														label="Label Color"
														color={formStyles.labelColor}
														onChange={(color) =>
															handleStyleUpdate("labelColor", color)
														}
													/>
												</div>
												<div>
													<ColorPicker
														label="Button Color"
														color={formStyles.buttonColor}
														onChange={(color) =>
															handleStyleUpdate("buttonColor", color)
														}
													/>
												</div>
												<div>
													<Label className="pb-[5px]">Button Label</Label>
													<Input
														value={formStyles.buttonText}
														onChange={(e) => {
															handleStyleUpdate("buttonText", e.target.value);
														}}
													/>
												</div>
											</div>
										</AccordionContent>
									</AccordionItem>
								</Accordion>
							</aside>
							
							<div className="flex flex-1">
								<main className="flex-1 bg-gray-100 p-4 drop-area builder-column">
									<h3 className="text-lg font-semibold mb-2">Style & Preview</h3>
									<ResponsiveScreen
										activeView={selectedView}
										setActiveView={setSelectedView}
									>
										<FormWrapper
											theme={formStyles}
											className={`form-${formStyles.selectedFormStyle}`}
										>
											{selectedView === "Form" ? (
												<>
													{elementsList.length &&
														elementsList.map((item: any) => (
															<div>
																<div className="form-item">
																	<BuilderElement
																		type={item.type}
																		data={item}
																		editable={false}
																		updateData={handleEditChange}
																		onEdit={() => {
																			handleEdit(item);
																		}}
																		onDelete={() => removeElement(item.id)}
																	/>
																</div>
															</div>
														))}
													<div className="form-item text-center">
														<Button type="submit">{formStyles.buttonText}</Button>
													</div>
												</>
											) : (
												<>
													{/* <ContentViewer
                    type="text"
                    content={textContent}
                      /> */}
													{/* <ContentViewer
                      type="markdown"
                      content={markdownContent}
                        /> */}
													{/* <ContentViewer
                      type="code"
                      content={codeContent}
                        /> */}
													<ContentViewer type="image" content={imageUrl}/>
												</>
											)}
										</FormWrapper>
									</ResponsiveScreen>
								</main>
							</div>
						</div>
					</TabsContent>
					<TabsContent value="options">
						<div className="flex flex-1">
							{/* Left Column */}
							<div className="w-1/3 p-4">
								<div className="grid grid-cols-1 gap-4">
									{/* Card 1 - Information */}
									<div
										onClick={() => setActiveOption("info")}
										className={`bg-white p-4 rounded shadow cursor-pointer transition-transform ${
											activeOption === "info" ? "bg-blue-500 border border-blue-300" : ""
										}`}
									>
										<div className="flex items-center justify-center w-12 h-12 bg-gray-300 rounded-full mb-4">
											<Icon name="info"/>
										</div>
										<h3 className="text-lg font-semibold">Information</h3>
										<p className="text-sm">
											Update the basic information of your app here: icon, title,
											description, etc.
										</p>
									</div>
									
									{/* Card 2 - Webhook */}
									<div
										onClick={() => setActiveOption("webhook")}
										className={`bg-white p-4 rounded shadow cursor-pointer transition-transform ${
											activeOption === "webhook" ? "bg-blue-500 border border-blue-300" : ""
										}`}
									>
										<div className="flex items-center justify-center w-12 h-12 bg-gray-300 rounded-full mb-4">
											<Icon name="webhook"/>
										</div>
										<h3 className="text-lg font-semibold">Webhook Integration</h3>
										<p className="text-sm">
											Connect your form with your favorite tools like Zapier and other third-party tools.
										</p>
									</div>
									
									{/* Card 3 - Email */}
									<div
										onClick={() => setActiveOption("email")}
										className={`bg-white p-4 rounded shadow cursor-pointer transition-transform ${
											activeOption === "email" ? "bg-blue-500 border border-blue-300" : ""
										}`}
									>
										<div className="flex items-center justify-center w-12 h-12 bg-gray-300 rounded-full mb-4">
											<Icon name="email"/>
										</div>
										<h3 className="text-lg font-semibold">Automated Email</h3>
										<p className="text-sm text-gray-600 mt-2">
											Automatically send an email to your leads when they submit the form.
											<br/>
											<span className="font-semibold text-red-500">Note:</span> Email address is required to send the
											message.
										</p>
									</div>
								</div>
							</div>
							{/* Right Column */}
							<div className="w-2/3 p-4">
								<main className="bg-gray-100 p-4 drop-area builder-column">
									<div className="grid grid-cols-1 gap-4">
										{activeOption === "info" && (
											<SettingsForm/>
										)}
										{activeOption === "webhook" && (
											<WebhookForm/>
										)}
										{activeOption === "email" && (
											<EmailForm/>
										)}
									</div>
								</main>
							</div>
						</div>
					</TabsContent>
				</div>
			</Tabs>
			<EmbedModal open={embedOpen} setIsOpen={setEmbedOpen}/>
		</>
	);
}