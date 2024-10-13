import React, { useState } from "react";
import axios from "axios";
import { useBuilderContext } from "@/providers/BuilderProvider";
import { ChildItem } from "@/app/types/builder";

interface Preview {
  type: string;
  content: string;
}

const useShareForm = () => {
  const { leadMagnet, elementsList, outputType, formStyles } = useBuilderContext();
  const [processing, setProcessing] = useState(false);
  const [preview, setPreview] = useState<Preview | undefined>();

  const [localElementsList, setLocalElementsList] = React.useState(elementsList);

  const handleEditChange = (key: string, value: string | boolean, builderSelected?: ChildItem) => {
    const selectedItemCopy = builderSelected;
    if (!selectedItemCopy) return;

    const index = localElementsList.findIndex((element: any) => element.id === selectedItemCopy.id);
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
  };

  const onGenerateLead = async () => {
    setProcessing(true);
    const textPayload = elementsList.reduce((acc, element) => {
      if (!(element.type === "image" || element.type === "file")) {
        acc[element.name] = element.value;
      }
      return acc;
    }, {});

    try {
      if (outputType === "image") {
        const result = await axios.post(`/api/lead/generate/${leadMagnet.id}`, textPayload);
        setPreview({ type: "image", content: result.data?.message });
      } else {
        const imagePayload = elementsList.reduce((acc, element) => {
          if (element.type === "image" || element.type === "file") {
            acc.push({ type: "image_url", image_url: { url: element.value } });
          }
          return acc;
        }, []);
        const result = await axios.post(`/api/lead/validate/${leadMagnet.id}`, [
          { type: "text", text: JSON.stringify(textPayload) },
          ...imagePayload,
        ]);
        setPreview({ type: "text", content: result.data?.message });
      }
    } catch (e) {
      console.log(e);
    }
    setProcessing(false);
  };

  return {
    outputType,
    onGenerateLead,
    processing,
    elementsList,
    preview,
    formStyles,
    localElementsList,
  };
};

export default useShareForm;
