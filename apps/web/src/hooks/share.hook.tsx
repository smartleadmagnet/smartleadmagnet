import { useState } from "react";
import axios, { AxiosError } from "axios";
import { useBuilderContext } from "@/providers/BuilderProvider";
import { useForm } from "react-hook-form";
import { toast } from "@smartleadmagnet/ui/hooks/use-toast";
import { isValid } from "date-fns";

interface Preview {
  type: string;
  content: string;
}

const useShareForm = () => {
  const { leadMagnet, elementsList, outputType, formStyles } = useBuilderContext();
  const [response, setResponse] = useState<Preview | undefined>();
  const [lastInput, setLastInput] = useState<any>();
  const methods = useForm();
  const {
    control,
    handleSubmit,
    trigger,
    
    formState: { errors, isSubmitting },
  } = methods;

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

  const modifyData = (data: any) => {
    let copyData = { ...data };
  
    for (const key in copyData) {
      if (Array.isArray(copyData[key])) {
        copyData[key] = copyData[key].join(',');  // Join array items with commas
      }
    }
    return copyData;
  };
  

  const onSubmit = async (data: any) => {
    console.log(data)
    // Trigger any necessary validations
    trigger();
    // Initialize isValid as true
    let isValid = true;
    // Filter the elementsList to get the required items
    const requiredElements = elementsList.filter((item: any) => item.required);
  
    // Check if all required elements are present in the data
    requiredElements.forEach((item: any) => {
      if (!data[item.name]) {
        isValid = false;
      }
    });
  
    // If any required element is missing or invalid, isValid will be false
    if (!isValid) {
      console.log("Form is invalid, required elements are missing or empty.");
      return;
    }
    // If the form is valid, you can proceed with your logic (e.g., generating leads)
    setLastInput(data);
    await onGenerateLead(modifyData(data));
  
    
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
    setResponse,
    methods
  };
};

export default useShareForm;
