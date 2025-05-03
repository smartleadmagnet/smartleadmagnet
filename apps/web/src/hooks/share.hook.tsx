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
  const [response, setResponse] = useState<Preview | undefined>();
  const [lastInput, setLastInput] = useState<any>();
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    trigger,
    getValues,
  } = useForm({
    mode: "onSubmit",
    defaultValues: elementsList.reduce((acc: any, element: any) => {
      if (element.type === "checkbox") {
        acc[element.name] = false;
      } else if (element.type === "select" || element.type === "radio-group") {
        acc[element.name] = "";
      } else {
        acc[element.name] = "";
      }
      return acc;
    }, {}),
  });

  async function onGenerateLead(data: any) {
    try {
      console.log("Generating lead with data:", data);
      if (outputType === "image") {
        const result = await axios.post(`/api/lead/generate/${leadMagnet.id}`, data);
        console.log("Image generation response:", result.data);
        setResponse({ type: "image", content: result.data?.message });
      } else {
        const result = await axios.post(`/api/lead/generate/${leadMagnet.id}`, data);
        console.log("Text generation response:", result.data);
        setResponse({ type: "text", content: result?.data?.message });
      }
    } catch (e: any) {
      console.error("Error generating lead:", e);
      if (axios.isAxiosError(e)) {
        const error = e as AxiosError<{ error: string }>;
        toast({
          variant: "destructive",
          title: "Error",
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
    // Manual validation for required fields
    const newErrors: Record<string, string> = {};
    let hasErrors = false;
    
    elementsList.forEach((element: any) => {
      if (element.required) {
        const value = data[element.name];
        if (!value || (typeof value === 'string' && value.trim() === '')) {
          newErrors[element.name] = `${element.label} is required`;
          hasErrors = true;
        } else if (element.type === 'website') {
          const urlPattern = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;
          if (!urlPattern.test(value)) {
            newErrors[element.name] = "Invalid website URL";
            hasErrors = true;
          }
        } else if (element.type === 'email') {
          const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailPattern.test(value)) {
            newErrors[element.name] = "Invalid email address";
            hasErrors = true;
          }
        }
      }
    });
    
    if (hasErrors) {
      setFormErrors(newErrors);
      return;
    }
    
    // Clear errors if validation passes
    setFormErrors({});
    
    // Store the input for regeneration
    setLastInput(data);
    
    // Proceed with form submission
    await onGenerateLead(data);
  };

  const onRegenerate = async () => {
    if (lastInput) {
      await onGenerateLead(lastInput);
    }
  };
  const clearError = (name: string) => {
    setFormErrors((prevErrors) => {
      const newErrors = { ...prevErrors };
      delete newErrors[name];
      return newErrors;
    });
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
    errors: formErrors,
    onRegenerate,
    leadMagnet,
    setResponse,
    clearError
  };
};

export default useShareForm;
