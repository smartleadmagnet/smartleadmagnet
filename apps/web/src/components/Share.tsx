"use client";

import { Controller } from "react-hook-form";
import { Button } from "@smartleadmagnet/ui/components/ui/button";
import { Input } from "@smartleadmagnet/ui/components/ui/input";
import { Textarea } from "@smartleadmagnet/ui/components/ui/textarea";
import { Checkbox } from "@smartleadmagnet/ui/components/ui/checkbox";
import { Label } from "@smartleadmagnet/ui/components/ui/label";
import Image from "next/image";
import Link from "next/link";
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
import styled from "styled-components";



const FormWrapper = styled.div`
  background-color: ${(props) => props.theme.backgroundColor};
  border: 1px solid #ccc;
  width: 90%;
  max-width: 600px;
  color: ${(props) => props.theme.textColor};
  margin: 0 auto;

  padding: 20px;
  border-radius: 5px;
  font-family: ${(props) => props.theme.selectedFont};
  .form-item {
    margin: 0 0 20px 0;
    padding: 0;
  }

  h1 {
    color: ${(props) => props.theme.titleColor};
  }

  h2 {
    color: ${(props) => props.theme.subtitleColor};
  }

  label {
    color: ${(props) => props.theme.labelColor};
    display: block;
    margin-bottom: 5px;
  }

  input {
    color: ${(props) => props.theme.textColor};
    &:focus {
      border-color: ${(props) => props.theme.buttonColor};
      outline: none;
    }
  }

  button[type="submit"] {
    background-color: ${(props) => props.theme.buttonColor};
    color: ${(props) => props.theme.buttonTextColor};
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;

    &:hover {
      background-color: darken(${(props) => props.theme.buttonColor}, 10%);
    }
  }
`;

export default function BuilderElementPreview() {
  const { onSubmit, isSubmitting, elementsList, response, onRegenerate, formStyles, control, handleSubmit, errors } =
    useShareForm();

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
            placeholder={element.placeholder}
            control={control}
            errors={errors}
          />
        );
      case "website":
        return (
          <WebsiteInput
            label={element.label}
            name={element.name}
            placeholder={element.placeholder}
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
              render={({ field }) => <Input {...field} placeholder={element.placeholder} />}
            />
            {errors[element.name] && <span className="text-red-500">{errors[element.name]?.message}</span>}
          </div>
        );
        case "number":
        return (
          <div>
            <Label className="mb-2 block text-sm font-semibold">
              {element.label} {element.required && <span className="text-red-500">*</span>}
            </Label>
            <Controller
              name={element.name}
              control={control}
              rules={{ required: element.required ? `${element.label} is required` : false }}
              render={({ field }) => <Input {...field} type="number" placeholder={element.placeholder} />}
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
              render={({ field }) => <Textarea {...field} placeholder={element.placeholder} />}
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
                    <SelectValue  placeholder={element.placeholder || "Select Option"} />
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
                <div className="relative w-full bg-white p-2">
                <input
                  type="file"
                   className="block h-auto w-full text-sm text-gray-500 file:mr-4 file:rounded-md file:border-0 file:bg-blue-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-blue-700 hover:file:bg-blue-100 focus:outline-none"
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
                </div>
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

        const { getRootProps, getInputProps,isDragActive } = useDropzone({ onDrop });

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
                    <span className="mt-2 text-sm">
                  {isDragActive ? "Drop the image here..." : "Drag and drop an image here, or click to select one"}
                </span>
                  </div>

                  {preview && <img src={preview} alt="Preview" className="mt-4 h-auto max-w-full rounded-md" />}

                  {/* Handle setting the value of the image */}
                  <input type="hidden" {...field} value={preview || ""} onChange={() => field.onChange(preview)} />
                </>
              )}
            />
            <p className="mt-2 text-xs text-gray-500">Please upload an image (JPG, PNG, GIF).</p>
            {errors[element.name] && <span className="text-red-500">{errors[element.name]?.message}</span>}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <FormWrapper theme={formStyles}>
      {response && <AIResponse response={response.content} type={response.type} onRegenerate={onRegenerate} />}
      {!response && (
        <form onSubmit={handleSubmit(onSubmit)} className={`form-${formStyles.selectedFormStyle}`}>
          {elementsList.map((element, index) => (
            <div className="form-item" key={index}>{renderElement(element)}</div>
          ))}

          <Button type="submit">
            {isSubmitting && <Spinner />}
            {!isSubmitting && "Submit"}
          </Button>
          
        </form>
      )}
      <div className="bg-gray-900 flex justify-center p-5 items-center text-white mt-10 ml-[-20px] mr-[-20px] mb-[-20px] rounded-b" >
            Carafted  by 
          <Link href="/">
                <Image src="/images/logo/logo.png" alt="Logo" width={150} height={0} />
              </Link>
              </div>
    </FormWrapper>
  );
}
