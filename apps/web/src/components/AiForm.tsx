"use client";

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
import AIResponse from "@smartleadmagnet/ui/components/AIResponse";
import React, { Suspense } from "react";
import ApiKeySelector from "@/components/ApiKeySelector";
import { Checkbox } from "@smartleadmagnet/ui/components/ui/checkbox";

export default function AIForm({ user }: { user: any }) {
  const {
    leadMagnet,
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
    setPreview,
    onPublicAccessChange,
  } = useAIForm();
  return (
    <div className="relative flex  w-full flex-col justify-between rounded-md bg-white p-4">
      <div className="scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-100 ai-form flex flex-col overflow-y-auto p-1">
        {!preview && !processing ? (
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
                <Select value={selectedProvider?.name!} onValueChange={onProviderChange}>
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
            {user.role === "admin" && (
              <div className="flex w-full gap-2">
                <div className="form-control mb-4 w-full flex-row items-center justify-center">
                  <Checkbox
                    id="publicAccess"
                    className="mr-2"
                    checked={leadMagnet.public}
                    onCheckedChange={(e: any) => {
                      // @ts-ignore
                      onPublicAccessChange(Boolean(e));
                    }}
                  />
                  <Label htmlFor="publicAccess">Is Publically Assisble</Label>
                </div>
              </div>
            )}
            <div className="flex w-full flex-col gap-2">
              <div className="border-primary w-full rounded-lg border bg-white p-3">
                <div className="mb-3 flex items-center justify-between">
                  <h3>Models</h3>
                  <ApiKeySelector />
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
        ) : (
          <div className="flex  items-center justify-center">
            <div className="w-full">
              <Suspense fallback={<div>Loading...</div>}>
                <AIResponse
                  response={preview?.content!}
                  type={outputType}
                  isLoading={processing}
                  handleBack={() => setPreview(undefined)}
                />
              </Suspense>
            </div>
          </div>
        )}

        {!preview && !processing && (
          <Button className="btn-primary mt-4 flex hover:bg-cyan-600" onClick={onValidatePrompt}>
            Validate Prompt
          </Button>
        )}
      </div>
    </div>
  );
}
