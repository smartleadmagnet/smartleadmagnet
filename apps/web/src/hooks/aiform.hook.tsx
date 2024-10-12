import { LeadMagnet } from "@smartleadmagnet/database";
import { useState } from "react";
import axios from "axios";
import { useBuilderContext } from "@/providers/BuilderProvider";

const useAIForm = ({leadMagnet}: { leadMagnet: LeadMagnet }) => {
  const {
    elementsList,
    setPrompt,
    prompt,
    selectedProvider,
    selectedModel,
    outputType,
    onProviderChange,
    filteredProviders,
    onOutputTypeChange,
    filteredModels,
    setSelectedModel,
  } = useBuilderContext();
  const [processing, setProcessing] = useState(false);

  const onValidatePrompt = async () => {
    setProcessing(true);
    const textPayload = elementsList.reduce((acc, element) => {
      if (!(element.type === "image" || element.type === "file")) {
        acc[element.name] = element.value;
      }
      return acc;
    }, {});

    try {
      if (outputType === "image") {
        const result = await axios.post(`/api/lead/validate/${leadMagnet.id}`, textPayload);
        console.log({result})

      } else {
        const imagePayload = elementsList.reduce((acc, element) => {
          if (element.type === "image" || element.type === "file") {
            acc.push({"type": "image_url", "image_url": {"url": element.value}});
          }
          return acc;
        }, []);
        const result = await axios.post(`/api/lead/validate/${leadMagnet.id}`, [
          {"type": "text", "text": JSON.stringify(textPayload)},
          ...imagePayload,
        ]);
      }

    } catch (e) {
      console.log(e);
    }
    setProcessing(false);
  }

  return {
    prompt,
    setPrompt,
    providers: filteredProviders,
    onProviderChange,
    selectedProvider,
    selectedModel,
    setSelectedModel,
    outputType,
    setOutputType: onOutputTypeChange,
    filteredModels,
    onValidatePrompt,
    processing,
    elementsList
  };
};

export default useAIForm;
