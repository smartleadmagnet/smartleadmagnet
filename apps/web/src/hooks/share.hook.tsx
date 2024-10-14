import { useState } from "react";
import axios from "axios";
import { useBuilderContext } from "@/providers/BuilderProvider";
import { useForm } from "react-hook-form";

interface Preview {
  type: string;
  content: string;
}

const useShareForm = () => {
  const { leadMagnet, elementsList, outputType, formStyles } = useBuilderContext();
  const [response, setResponse] = useState<Preview | undefined>();
  const [lastInput, setLastInput] = useState<any>();

  const {
    control,
    handleSubmit,

    formState: { errors, isSubmitting },
  } = useForm({});

  async function onGenerateLead(data: any) {
    try {
      if (outputType === "image") {
        const result = await axios.post(`/api/lead/generate/${leadMagnet.id}`, data);
        setResponse({ type: "image", content: result.data?.message });
      } else {
        const imagePayload = elementsList.reduce((acc, element) => {
          if (element.type === "image" || element.type === "file") {
            acc.push({ type: "image_url", image_url: { url: element.value } });
          }
          return acc;
        }, []);
        const result = await axios.post(`/api/lead/generate/${leadMagnet.id}`, [
          { type: "text", text: JSON.stringify(data) },
          ...imagePayload,
        ]);
        setResponse({ type: "text", content: result.data?.message });
      }
    } catch (e) {
      console.log(e);
    }
  }

  const onSubmit = async (data: any) => {
    setLastInput(data);
    await onGenerateLead(data);
  };

  const onRegenerate = async () => {
    await onGenerateLead(lastInput);
  };

  return {
    outputType,
    onSubmit,
    isSubmitting,
    elementsList,
    response,
    formStyles,
    control,
    handleSubmit,
    errors,
    onRegenerate,
  };
};

export default useShareForm;
