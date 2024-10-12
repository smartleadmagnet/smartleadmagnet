"use client";
import React, { createContext, useContext, useEffect, useState } from 'react';
import { ChildItem } from '@/app/types/builder';
import { LeadMagnet } from "@smartleadmagnet/database";
import axios from "axios";
import llm from "@/data/llm.json";
import { LLMModel, LLMProvider } from "@/types/llm";
import { BuilderSchemaForm } from "@/types/builder";

interface BuilderContextType {
  elementsList: any;
  formStyles: any;
  name: string;
  selectedProvider: LLMProvider;
  selectedModel: string;
  outputType: string;
  prompt: string;
  setElementsList: (value: ChildItem[] | ((prevState: ChildItem[]) => ChildItem[])) => void;
  setName: (value: string | ((prevState: string) => string)) => void;
  setSelectedProvider?: (value: LLMProvider | ((prevState: LLMProvider) => LLMProvider)) => void;
  setSelectedModel?: (value: string | ((prevState: string) => string)) => void;
  setOutputType?: (value: string | ((prevState: string) => string)) => void;
  setPrompt: (value: string | ((prevState: string) => string)) => void;
  setFormStyles: (value: typeof defaultFormStyles | ((prevState: typeof defaultFormStyles) => typeof defaultFormStyles)) => void;
  onProviderChange: (provider: string) => void;
  filteredProviders: LLMProvider[];
  onOutputTypeChange: (type: string) => void;
  filteredModels: LLMModel[];
}

const BuilderContext = createContext<BuilderContextType | undefined>(undefined);

const defaultFormStyles = {
  textColor: "#333333", // Dark gray for text
  backgroundColor: "#f9f9f9", // Light gray for background
  buttonColor: "#4CAF50", // Green for buttons (pleasant and eye-catching)
  buttonTextColor: "#ffffff", // White text on buttons for contrast
  labelColor: "#666666", // Medium gray for labels (subtle but visible)
  titleColor: "#2C3E50", // Dark blue for titles (professional feel)
  subtitleColor: "#34495E", // Slightly lighter blue for subtitles
  buttonText: "Submit", // Button text
  selectedFont: "Open Sans", // Default font
  selectedFormStyle: "default", // Default form style
};

export const BuilderProvider: React.FC<{ children: React.ReactNode, leadMagnet: LeadMagnet }> = ({
                                                                                                   children,
                                                                                                   leadMagnet
                                                                                                 }) => {
  const [elementsList, setElementsList] = useState<ChildItem[]>(leadMagnet.components || []);
  const [name, setName] = useState<string>(leadMagnet?.name || "");
  const defaultLLMProvider = leadMagnet?.provider ? llm.find((provider) => provider.name === leadMagnet.provider) : llm[0];
  const [prompt, setPrompt] = useState<string>(leadMagnet?.prompt || "");
  const [selectedProvider, setSelectedProvider] = useState<LLMProvider>(defaultLLMProvider);
  const [selectedModel, setSelectedModel] = useState<string>(leadMagnet.model || selectedProvider?.models[0]?.name || "");
  const [outputType, setOutputType] = useState<string>(leadMagnet?.output || "text");

  // Ensure formStyles has the correct type and merge it properly
  const [formStyles, setFormStyles] = useState({
    ...defaultFormStyles,
    ...(leadMagnet?.styles || {}),
  });

  const updateData = async () => {
    try {
      await axios.post(`/api/lead/${leadMagnet.id}`, {
        components: elementsList,
        styles: formStyles,
        name,
        prompt,
        provider: selectedProvider?.name,
        model: selectedModel,
        output: outputType,
      });
    } catch (e) {
      console.log(e);
    }
  }

  const updateSettingFormData = async (form: BuilderSchemaForm) => {
    try {
      await axios.post(`/api/lead/${leadMagnet.id}`, form);
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    // make an API call to update the components
    updateData();

  }, [elementsList, formStyles]);

  useEffect(() => {
    const filteredModels = filterModels(selectedProvider?.models || []);

    if (!filteredModels.find(model => model.name === selectedModel)) {
      setSelectedModel(filteredModels[0]?.name || "");
    }

    const handler = setTimeout(() => {
      updateData();
    }, 500);

    return () => {
      clearTimeout(handler);
    };

    return () => {
      clearTimeout(handler); // Cleanup the timeout on unmount or when prompt changes
    };
  }, [name, prompt, selectedModel, outputType, selectedProvider]);

  const filterProviders = (providers: LLMProvider[], output?: string): LLMProvider[] => {
    const type = output || outputType;
    return providers.filter(provider =>
      provider.models.some(model => {
        if (type === "image") return model.generateImage;
        if (type === "text" || type === "markdown") return model.text;
        return true;
      })
    );
  };

  const filterModels = (models: LLMModel[]): LLMModel[] => {
    const hasImageOrFile = elementsList.some(element => element.type === "image" || element.type === "file");

    return models.filter(model => {
      if (outputType === "image") return model.generateImage;
      if (outputType === "text" || outputType === "markdown") {
        if (hasImageOrFile) return model.text && model.vision;
        return model.text;
      }
      return true;
    });
  };

  const onOutputTypeChange = (type: string) => {
    setOutputType(type);
    const filteredProviders = filterProviders(llm, type);
    const filteredModels = filterModels(selectedProvider?.models || []);

    if (!filteredProviders.find(provider => provider.name === selectedProvider?.name)) {
      setSelectedProvider(filteredProviders[0]);
    }

    if (!filteredModels.find(model => model.name === selectedModel)) {
      setSelectedModel(filteredModels[0]?.name || "");
    }
  }

  const onProviderChange = (provider: string) => {
    const newProvider = llm.find((p) => p.name === provider);
    setSelectedProvider(newProvider);

    const filteredModels = filterModels(newProvider?.models || []);
    setSelectedModel(filteredModels[0]?.name || "");
  };


  const filteredProviders = filterProviders(llm);
  const filteredModels = filterModels(selectedProvider?.models || []);

  return (
    <BuilderContext.Provider value={{
      elementsList,
      formStyles,
      name,
      selectedProvider,
      selectedModel,
      outputType,
      prompt,
      setElementsList,
      setName,
      setSelectedProvider,
      setSelectedModel,
      setOutputType,
      setPrompt,
      setFormStyles,
      onProviderChange,
      filteredProviders,
      onOutputTypeChange,
      filteredModels,
      updateSettingFormData,
      leadMagnet,
    }}>
      {children}
    </BuilderContext.Provider>
  );
};


export const useBuilderContext = (): BuilderContextType => {
  const context = useContext(BuilderContext);
  if (context === undefined) {
    throw new Error('useBuilderContext must be used within a BuilderProvider');
  }
  return context;
};
