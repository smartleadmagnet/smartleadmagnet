import { useState } from "react";
import axios, { AxiosError } from "axios";
import { useBuilderContext } from "@/providers/BuilderProvider";
import { useForm } from "react-hook-form";
import { toast } from "@smartleadmagnet/ui/hooks/use-toast";

interface Preview {
  type: string;
  content: string;
}

const useShareForm = () => {
  const { leadMagnet, elementsList, outputType, formStyles } = useBuilderContext();
  const [response, setResponse] = useState<Preview | undefined>({
    type: "text", content: "Smaple"
  });
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
        const result = await axios.post(`/api/lead/generate/${leadMagnet.id}`, data);
        setResponse({ type: "text", content: result?.data?.message });
      }
    } catch (e: any) {
      // if axios error the display the error message
      if (axios.isAxiosError(e)) {
        const error = e as AxiosError;
        // @ts-ignore
        toast({
          variant: "destructive",
          title: "Error",
          // @ts-ignore
          description: error?.response?.data?.error || error.message,
        });
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: e?.message,
        });
      }
    }
  }

  const onSubmit = async (data: any) => {
    console.log(data);
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
    leadMagnet,
  };
};

export default useShareForm;
