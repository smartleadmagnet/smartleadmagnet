import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@smartleadmagnet/ui/components/ui/accordion";
import { formStyleOptions } from "@smartleadmagnet/ui/lib/constants";
import { Card } from "@smartleadmagnet/ui/components/ui/card";
import { Input } from "@smartleadmagnet/ui/components/ui/input";
import { Button } from "@smartleadmagnet/ui/components/ui/button";
import { Label } from "@smartleadmagnet/ui/components/ui/label";
import FontSelector from "@smartleadmagnet/ui/components/ui/FontSelector";
import ColorPicker from "@smartleadmagnet/ui/components/ColorPicker";
import ResponsiveScreen from "@/components/ResponsiveScreen";
import BuilderElement from "@/components/BuilderElement";
import ContentViewer from "@/components/ContentViewer";
import styled from "styled-components";

interface Props {
  formStyles: any;
  handleStyleUpdate: Function;
  elementsList: any;
  handleEditChange: Function;
  handleEdit: Function;
  removeElement: Function;
  selectedView: string;
  setSelectedView: Function;
  textContent: string;
  markdownContent: string;
  codeContent: string;
  imageUrl: string;
}

const FormWrapper = styled.div`
  background-color: ${(props) => props.theme.backgroundColor};
  border: 1px solid #ccc;
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

export default function BuilderStylePreview({
                                              formStyles,
                                              handleStyleUpdate,
                                              elementsList,
                                              handleEditChange,
                                              handleEdit,
                                              removeElement,
                                              selectedView,
                                              setSelectedView,
                                              imageUrl,
                                            }: Props) {
  return (
    <div className="flex flex-1 builder-wrapper">
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
                          placeholder="Enter the Lead Magnet Name"
                          className="w-full pointer-events-none"
                        />
                        <Button className="btn-primary pointer-events-none">
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
                    onChange={(color) => handleStyleUpdate("titleColor", color)}
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
                    onChange={(color) => handleStyleUpdate("labelColor", color)}
                  />
                </div>
                <div>
                  <ColorPicker
                    label="Text Color"
                    color={formStyles.textColor}
                    onChange={(color) => handleStyleUpdate("textColor", color)}
                  />
                </div>
                <div>
                  <ColorPicker
                    label="Label Color"
                    color={formStyles.labelColor}
                    onChange={(color) => handleStyleUpdate("labelColor", color)}
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
  );
}
