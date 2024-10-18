"use client";
import React, { createContext, useContext, useState } from "react";
import { ChildItem } from "@/app/types/builder";
import { LeadMagnet, ApiKey } from "@smartleadmagnet/database";
import axios from "axios";
import llm from "@/data/llm.json";
import { LLMModel, LLMProvider } from "@/types/llm";
import { BuilderSchemaForm } from "@/types/builder";
import { toast } from "@smartleadmagnet/ui/hooks/use-toast";

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
  setFormStyles: (
    value: typeof defaultFormStyles | ((prevState: typeof defaultFormStyles) => typeof defaultFormStyles)
  ) => void;
  onProviderChange: (provider: string) => void;
  filteredProviders: LLMProvider[];
  onOutputTypeChange: (type: string) => void;
  filteredModels: LLMModel[];
  fetchApiKeys: () => Promise<Array<ApiKey>>;
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

export const BuilderProvider: React.FC<{ children: React.ReactNode; leadMagnet: LeadMagnet }> = ({
  children,
  leadMagnet,
}) => {
  const [selectedLeadMagnet, setSelectedLeadMagnet] = useState<LeadMagnet>(leadMagnet);
  const [elementsList, setElementsList] = useState<ChildItem[]>(leadMagnet.components || []);
  const [name, setName] = useState<string>(leadMagnet?.name || "");
  const defaultLLMProvider = leadMagnet?.provider
    ? llm.find((provider) => provider.name === leadMagnet.provider)
    : llm[0];
  const [prompt, setPrompt] = useState<string>(leadMagnet?.prompt || "");
  const [selectedProvider, setSelectedProvider] = useState<LLMProvider>(defaultLLMProvider);
  const [selectedModel, setSelectedModel] = useState<string>(
    leadMagnet.model || selectedProvider?.models[0]?.name || ""
  );
  const [outputType, setOutputType] = useState<string>(leadMagnet?.output || "text");

  // Ensure formStyles has the correct type and merge it properly
  const [formStyles, setFormStyles] = useState({
    ...defaultFormStyles,
    ...(leadMagnet?.styles || {}),
  });

  const updateData = async (data?: any) => {
    try {
      const leadResponse = await axios.post(`/api/lead/${leadMagnet.id}`, {
        components: elementsList,
        styles: formStyles,
        name,
        prompt,
        provider: selectedProvider?.name,
        model: selectedModel,
        output: outputType,
        ...(data || {}),
      });
      setSelectedLeadMagnet(leadResponse?.data);
    } catch (e) {
      // TODO handle sentry error
      console.log(e);
    }
  };

  const updateSettingFormData = async (form: BuilderSchemaForm) => {
    try {
      await axios.post(`/api/lead/${leadMagnet.id}`, form);
    } catch (e) {
      console.log(e);
    }
  };

  const fetchApiKeys = async () => {
    try {
      const { data } = await axios.get(`/api/keys`);
      return data || [];
    } catch (e) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Could not fetch API keys",
      });
    }
  };

  const updateElementList = async (components: any) => {
    setElementsList(components);
    await updateData({ components });
  };

  const updatedSelectedModel = async (model: any) => {
    setSelectedModel(model);
    await updateData({ model });
  };

  const updateFormStyles = async (styles: any) => {
    setFormStyles(styles);
    await updateData({ styles });
  };

  const updateName = async (name: string) => {
    setName(name);
    await updateData({ name });
  };

  const updatePrompt = async (prompt: string) => {
    setPrompt(prompt);
    await updateData({ prompt });
  };

  const filterProviders = (providers: LLMProvider[], output?: string): LLMProvider[] => {
    const type = output || outputType;
    return providers.filter((provider) =>
      provider.models.some((model) => {
        if (type === "image") return model.generateImage;
        if (type === "text" || type === "markdown") return model.text;
        return true;
      })
    );
  };

  const filterModels = (models: LLMModel[]): LLMModel[] => {
    const hasImageOrFile = elementsList.some((element) => element.type === "image" || element.type === "file");

    return models.filter((model) => {
      if (outputType === "image") return model.generateImage;
      if (outputType === "text" || outputType === "markdown") {
        if (hasImageOrFile) return model.text && model.vision;
        return model.text;
      }
      return true;
    });
  };

  const onOutputTypeChange = async (type: string) => {
    setOutputType(type);
    let provider = leadMagnet.provider;
    let model = leadMagnet.model;
    const filteredProviders = filterProviders(llm, type);
    const filteredModels = filterModels(selectedProvider?.models || []);

    if (!filteredProviders.find((provider) => provider.name === selectedProvider?.name)) {
      provider = filteredProviders[0];
      setSelectedProvider(provider);
    }

    if (!filteredModels.find((model) => model.name === selectedModel)) {
      const model = filteredModels[0]?.name || "";
      setSelectedModel(model);
    }
    await updateData({ provider: provider?.name, model, output: type });
  };

  const onProviderChange = async (provider: string) => {
    const newProvider = llm.find((p) => p.name === provider);
    setSelectedProvider(newProvider);

    const filteredModels = filterModels(newProvider?.models || []);
    const model = filteredModels[0]?.name || "";
    setSelectedModel(model);

    await updateData({ provider, model });
  };

  const filteredProviders = filterProviders(llm);
  const filteredModels = filterModels(selectedProvider?.models || []);

  return (
    <BuilderContext.Provider
      value={{
        elementsList,
        formStyles,
        name,
        selectedProvider,
        selectedModel,
        outputType,
        prompt,
        setElementsList: updateElementList,
        setName: updateName,
        setSelectedModel: updatedSelectedModel,
        setOutputType,
        setPrompt: updatePrompt,
        setFormStyles: updateFormStyles,
        onProviderChange,
        filteredProviders,
        onOutputTypeChange,
        filteredModels,
        updateSettingFormData,
        leadMagnet: selectedLeadMagnet,
        fetchApiKeys,
      }}
    >
      {children}
    </BuilderContext.Provider>
  );
};

export const useBuilderContext = (): BuilderContextType => {
  const context = useContext(BuilderContext);
  if (context === undefined) {
    throw new Error("useBuilderContext must be used within a BuilderProvider");
  }
  return context;
};
