import { Label } from "@smartleadmagnet/ui/components/ui/label";
import MentionTextArea from "@smartleadmagnet/ui/components/MentionTextArea";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@smartleadmagnet/ui/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@smartleadmagnet/ui/components/ui/radio-group";
import useAIForm from "@/hooks/aiform.hook";
import { Badge } from "@smartleadmagnet/ui/components/ui/badge";
import { Button } from "@smartleadmagnet/ui/components/ui/button";
import Spinner from "@smartleadmagnet/ui/components/Spinner";
import ContentViewer from "@/components/ContentViewer";
import React from "react";

export default function AIForm() {
  const {
    prompt,
    setPrompt,
    providers,
    onProviderChange,
    selectedProvider,
    selectedModel,
    setSelectedModel,
    setOutputType,
    filteredModels,
    outputType,
    onValidatePrompt,
    processing,
    elementsList,
    preview,
  } = useAIForm();
  return (
    <div className="relative flex h-full w-full flex-col justify-between rounded-md bg-white p-4 p-4">
      <div className="scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-100 flex h-full flex-col overflow-y-auto p-1 ai-form">
        {!preview && (
          <div className="flex  flex-col">
            <div className="form-control w-full">
              <div className="mb-[10px] flex w-full items-center justify-between">
                <Label>Prompt</Label>
              </div>
              <MentionTextArea
                defaultValue={prompt}
                onPromptChange={setPrompt}
                options={elementsList
                  .filter((item: any) => item.formElement)
                  .map((element: any) => ({
                    id: element.name,
                    display: `{{${element.name}}}`,
                  }))}
              />
            </div>
            <div className="form-control mb-4 w-full">
              <Label>Output Type</Label>
              <Select value={outputType} onValueChange={setOutputType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select the output type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="text">Text</SelectItem>
                    <SelectItem value="markdown">Markdown/Code</SelectItem>
                    <SelectItem value="image">Image</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            {/* Output Type and Provider */}
            <div className="flex w-full gap-2">
              <div className="form-control mb-4 w-full">
                <Label>Provider</Label>
                <Select value={selectedProvider.name} onValueChange={onProviderChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a LLM Provider" />
                  </SelectTrigger>
                  <SelectContent>
                    {providers?.map((provider) => (
                      <SelectItem key={provider.name} value={provider.name}>
                        {provider.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex w-full flex-col gap-2">
              <div className="border-primary w-full rounded-lg border bg-white p-3">
                <div className="mb-1 flex items-center justify-between">
                  <h3>Models</h3>
                </div>
                <RadioGroup value={selectedModel} className="flex  flex-wrap gap-3" onValueChange={setSelectedModel}>
                  {filteredModels.map((model) => (
                    <div className="flex cursor-pointer items-center space-x-2" key={model.name}>
                      <RadioGroupItem value={model.name} id={model.name} />
                      <Label htmlFor={model.name}>{model.displayName}</Label>
                      {model.vision && (
                        <Badge className="!min-w-[60px] text-[8px]" variant="destructive">
                          Support File
                        </Badge>
                      )}
                      {model.generateImage && (
                        <Badge className="!min-w-[150px] justify-center text-[10px]">Generate Image</Badge>
                      )}
                    </div>
                  ))}
                </RadioGroup>
              </div>
            </div>
          </div>
        )}
        {preview && (
          <div className="flex h-full items-center justify-center">
            <div className="flex flex-col items-center justify-center">
              <ContentViewer type={preview?.type!} content={preview?.content!} />
            </div>
          </div>
        )}
        <Button className="flex mt-4" onClick={onValidatePrompt}>
          {processing && <Spinner />}
          {!processing && "Validate Prompt"}
        </Button>
      </div>
    </div>
  );
}
