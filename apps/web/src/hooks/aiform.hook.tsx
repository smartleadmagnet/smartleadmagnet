import { useState } from "react";
import axios from "axios";
import { useBuilderContext } from "@/providers/BuilderProvider";

interface Preview {
  type: string;
  content: string;
}

const useAIForm = () => {
  const {
    leadMagnet,
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
  const [preview, setPreview] = useState<Preview | undefined>();

  const onValidatePrompt = async () => {
    setProcessing(true);
    try {
      if (outputType === "image") {
        const textPayload = elementsList.reduce((acc, element) => {
          if (!(element.type === "image" || element.type === "file")) {
            acc[element.name] = element.value;
          }
          return acc;
        }, {});
        const result = await axios.post(`/api/lead/validate/${leadMagnet.id}`, textPayload);
        console.log({ type: "image", content: result.data?.message });
        setPreview({ type: "image", content: result.data?.message });
      } else {
        const payload = elementsList.reduce((acc, element) => {
          acc[element.name] = element.value;
          return acc;
        }, {});
        const result = await axios.post(`/api/lead/validate/${leadMagnet.id}`, payload);
        console.log({ type: "text", content: result.data?.message });
        setPreview({ type: "text", content: result.data?.message });
      }
    } catch (e) {
      console.log(e);
    }
    setProcessing(false);
  };

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
    elementsList,
    preview,
    setPreview,
  };
};

export default useAIForm;
