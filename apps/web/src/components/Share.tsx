"use client";

import { Controller } from "react-hook-form";
import { Button } from "@smartleadmagnet/ui/components/ui/button";
import { Input } from "@smartleadmagnet/ui/components/ui/input";
import { Textarea } from "@smartleadmagnet/ui/components/ui/textarea";
import { Checkbox } from "@smartleadmagnet/ui/components/ui/checkbox";
import { Label } from "@smartleadmagnet/ui/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@smartleadmagnet/ui/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@smartleadmagnet/ui/components/ui/radio-group";
import { Separator } from "@smartleadmagnet/ui/components/ui/separator";
import ColorPicker from "@smartleadmagnet/ui/components/ColorPicker";
import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import useShareForm from "@/hooks/share.hook";
import Spinner from "@smartleadmagnet/ui/components/Spinner";
import AIResponse from "@smartleadmagnet/ui/components/AIResponse";
import EmailInput from "@/components/EmailInput";
import WebsiteInput from "@/components/WebsiteInput";

export default function BuilderElementPreview() {
  const {
    outputType,
    onSubmit,
    isSubmitting,
    elementsList,
    response,
    onRegenerate,
    formStyles,
    control,
    handleSubmit,
    errors,
  } = useShareForm();

  const renderElement = (element: any) => {
    switch (element.type) {
      case "title":
        return (
          <div className="text-center">
            <h1 className="text-3xl font-semibold">{element.value}</h1>
          </div>
        );
      case "subtitle":
        return (
          <div className="text-center">
            <h2 className="text-2xl font-semibold">{element.value}</h2>
          </div>
        );
      case "paragraph":
        return (
          <div>
            <p>{element.value}</p>
          </div>
        );
      case "separator":
        return <Separator className="my-4" />;
      case "email":
        return (
          <EmailInput
            label={element.label}
            name={element.name}
            required={element.required}
            control={control}
            errors={errors}
          />
        );
      case "website":
        return (
          <WebsiteInput
            label={element.label}
            name={element.name}
            required={element.required}
            control={control}
            errors={errors}
          />
        );
      case "text_field":
        return (
          <div>
            <Label className="mb-2 block text-sm font-semibold">
              {element.label} {element.required && <span className="text-red-500">*</span>}
            </Label>
            <Controller
              name={element.name}
              control={control}
              rules={{ required: element.required ? `${element.label} is required` : false }}
              render={({ field }) => <Input {...field} />}
            />
            {errors[element.name] && <span className="text-red-500">{errors[element.name]?.message}</span>}
          </div>
        );
      case "textarea":
        return (
          <div>
            <Label className="mb-2 block text-sm font-semibold">
              {element.label} {element.required && <span className="text-red-500">*</span>}
            </Label>
            <Controller
              name={element.name}
              control={control}
              rules={{ required: element.required ? `${element.label} is required` : false }}
              render={({ field }) => <Textarea {...field} />}
            />
            {errors[element.name] && <span className="text-red-500">{errors[element.name]?.message}</span>}
          </div>
        );
      case "checkbox":
        return (
          <div className="flex items-center">
            <Controller
              name={element.name}
              control={control}
              render={({ field }) => (
                <Checkbox checked={field.value} onCheckedChange={(checked) => field.onChange(checked)} />
              )}
            />
            <Label className="ml-2">{element.label}</Label>
          </div>
        );
      case "checkbox-group":
        return (
          <div>
            <Label className="mb-2 block text-sm font-semibold">
              {element.label} {element.required && <span className="text-red-500">*</span>}
            </Label>
            {element.options.map((option: any) => (
              <div key={option.value} className="flex items-center">
                <Controller
                  name={`${element.name}-${option.value}`}
                  control={control}
                  render={({ field }) => (
                    <Checkbox checked={field.value} onCheckedChange={(checked) => field.onChange(checked)} />
                  )}
                />
                <Label className="ml-2">{option.label}</Label>
              </div>
            ))}
          </div>
        );
      case "select":
        return (
          <div>
            <Label className="mb-2 block text-sm font-semibold">
              {element.label} {element.required && <span className="text-red-500">*</span>}
            </Label>
            <Controller
              name={element.name}
              control={control}
              rules={{ required: element.required ? `${element.label} is required` : false }}
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select option" />
                  </SelectTrigger>
                  <SelectContent>
                    {element.options.map((option: any) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors[element.name] && <span className="text-red-500">{errors[element.name]?.message}</span>}
          </div>
        );
      case "radio-group":
        return (
          <div>
            <Label className="mb-2 block text-sm font-semibold">
              {element.label} {element.required && <span className="text-red-500">*</span>}
            </Label>
            <Controller
              name={element.name}
              control={control}
              rules={{ required: element.required ? `${element.label} is required` : false }}
              render={({ field }) => (
                <RadioGroup value={field.value} onValueChange={field.onChange}>
                  {element.options.map((option: any) => (
                    <div key={option.value} className="flex items-center space-x-2">
                      <RadioGroupItem value={option.value} />
                      <Label>{option.label}</Label>
                    </div>
                  ))}
                </RadioGroup>
              )}
            />
            {errors[element.name] && <span className="text-red-500">{errors[element.name]?.message}</span>}
          </div>
        );
      case "color":
        return (
          <div>
            <Label className="mb-2 block text-sm font-semibold">{element.label}</Label>
            <Controller
              name={element.name}
              control={control}
              rules={{ required: element.required ? `${element.label} is required` : false }}
              render={({ field }) => <ColorPicker color={field.value} onChange={field.onChange} />}
            />
            {errors[element.name] && <span className="text-red-500">{errors[element.name]?.message}</span>}
          </div>
        );
      case "file":
        return (
          <div>
            <Label className="mb-2 block text-sm font-semibold">{element.label}</Label>
            <Controller
              name={element.name}
              control={control}
              rules={{ required: element.required ? `${element.label} is required` : false }}
              render={({ field }) => (
                <input
                  type="file"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onloadend = () => {
                        field.onChange(reader.result);
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                />
              )}
            />
            {errors[element.name] && <span className="text-red-500">{errors[element.name]?.message}</span>}
          </div>
        );
      case "image":
        const [preview, setPreview] = useState<string | null>(null);

        const onDrop = (acceptedFiles: File[]) => {
          const file = acceptedFiles[0];
          if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
              const result = reader.result as string;
              setPreview(result);
            };
            reader.readAsDataURL(file);
          }
        };

        const { getRootProps, getInputProps } = useDropzone({ onDrop });

        return (
          <div>
            <Label className="mb-2 block text-sm font-semibold">
              {element.label} {element.required && <span className="text-red-500">*</span>}
            </Label>

            <Controller
              name={element.name}
              control={control}
              rules={{
                required: element.required ? `${element.label} is required` : false,
              }}
              render={({ field }) => (
                <>
                  <div
                    {...getRootProps()}
                    className={`flex h-40 w-full items-center justify-center rounded-lg border-2 border-dashed ${
                      errors[element.name] ? "border-red-500" : "border-gray-300"
                    }`}
                  >
                    <input {...getInputProps()} />
                    <p>Drag & drop an image, or click to select</p>
                  </div>

                  {preview && <img src={preview} alt="Preview" className="mt-4 h-auto max-w-full rounded-md" />}

                  {/* Handle setting the value of the image */}
                  <input type="hidden" {...field} value={preview || ""} onChange={() => field.onChange(preview)} />
                </>
              )}
            />
            {errors[element.name] && <span className="text-red-500">{errors[element.name]?.message}</span>}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="p-4">
      {response && <AIResponse response={response.content} type={response.type} onRegenerate={onRegenerate} />}
      {!response && (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {elementsList.map((element, index) => (
            <div key={index}>{renderElement(element)}</div>
          ))}

          <Button type="submit">
            {isSubmitting && <Spinner />}
            {!isSubmitting && "Submit"}
          </Button>
        </form>
      )}
    </div>
  );
}
