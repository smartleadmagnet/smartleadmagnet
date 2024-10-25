"use client";
import React, { useState, useEffect } from "react";
import { Skeleton } from "@smartleadmagnet/ui/components/ui/skeleton";
import { Controller } from "react-hook-form";
import { Button } from "@smartleadmagnet/ui/components/ui/button";
import { Input } from "@smartleadmagnet/ui/components/ui/input";
import { Textarea } from "@smartleadmagnet/ui/components/ui/textarea";
import { Checkbox } from "@smartleadmagnet/ui/components/ui/checkbox";
import { Label } from "@smartleadmagnet/ui/components/ui/label";
import DynamicStyles from "@/components/DynamicStyles";
import Image from "next/image";
import { marked } from "marked";
import FontPicker from "font-picker-react";
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
import useShareForm from "@/hooks/share.hook";
import { Loader2 } from "lucide-react"
import AIResponse from "@smartleadmagnet/ui/components/AIResponse";
import EmailInput from "@/components/EmailInput";
import WebsiteInput from "@/components/WebsiteInput";
import styled from "styled-components";
import ImageUploader from "@/components/ImageUploader";
import { BsFillInfoSquareFill } from "react-icons/bs";
import { Dialog, DialogContent } from "@smartleadmagnet/ui/components/ui/dialog";


function Loading() {
  return (
    <div className="mx-auto mt-10 max-w-[600px] border px-5">
      <Skeleton className="mx-auto mb-2 mt-2 h-20 max-w-20 rounded-full" />
      <div className="mb-4 space-y-5">
        <Skeleton className="mx-auto h-4 max-w-[300px]" />
        <Skeleton className="mx-auto  h-20 max-w-[400px]" />
        <Skeleton className="h-10" />
        <Skeleton className="h-10" />
        <Skeleton className="h-10" />
        <Skeleton className="h-10" />
        <Skeleton className="h-10" />
        <Skeleton className="h-10 max-w-[100px]" />
      </div>
    </div>
  );
}

const FormWrapper = styled.div`
  background-color: ${(props) => props.theme.backgroundColor};
  border: 1px solid #ccc;
  width: 90%;
  max-width: 600px;
  color: ${(props) => props.theme.textColor};
  margin: 0 auto;
  position: relative;

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
      box-shadow: none;
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
  const {
    onSubmit,
    isSubmitting,
    elementsList,
    response,
    onRegenerate,
    formStyles,
    control,
    handleSubmit,
    errors,
    leadMagnet,
  } = useShareForm();
  const [isLoading, setLoading] = useState(true);
  const [showInfo, setShowInfo] = useState(false);

  useEffect(() => {
    if (leadMagnet) {
      setLoading(false);
    }
  }, [leadMagnet]);

  if (isLoading) {
    return <Loading />;
  }

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
            {errors[element.name] && <span className="text-red-500">{String(errors?.[element?.name]?.message)}</span>}
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
            {errors[element.name] && <span className="text-red-500">{String(errors?.[element?.name]?.message)}</span>}
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
            {errors[element.name] && <span className="text-red-500">{String(errors?.[element?.name]?.message)}</span>}
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
                    <SelectValue placeholder={element.placeholder || "Select Option"} />
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
            {errors[element.name] && <span className="text-red-500">{String(errors?.[element?.name]?.message)}</span>}
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
            {errors[element.name] && <span className="text-red-500">{String(errors?.[element?.name]?.message)}</span>}
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
            {errors[element.name] && <span className="text-red-500">{String(errors?.[element?.name]?.message)}</span>}
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
                <div className="relative max-w-full bg-white p-2">
                  <input
                    type="file"
                    className="block h-auto max-w-full text-sm text-gray-500 file:mr-4 file:rounded-md file:border-0 file:bg-blue-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-blue-700 hover:file:bg-blue-100 focus:outline-none"
                    onChange={(e: any) => {
                      const file = e?.target?.files?.[0];
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
            {errors[element.name] && <span className="text-red-500">{String(errors?.[element?.name]?.message)}</span>}
          </div>
        );
      case "image":
        return <ImageUploader control={control} element={element} errors={errors} />;
      default:
        return null;
    }
  };

  return (
    <FormWrapper theme={formStyles} className="magnet-wrapper">
      
      <Dialog open={showInfo}  onOpenChange={()=>{
        setShowInfo(!showInfo);
      }}>
      
        
      <DialogContent className="mx-auto max-w-lg" >
      <h1 className="mb-2 text-center text-xl font-bold">{leadMagnet.name}</h1>
      <div className="mb-5 text-center" dangerouslySetInnerHTML={{ __html: marked(leadMagnet.description) }} />
      </DialogContent>
    </Dialog>
      <DynamicStyles cssContent={formStyles.customCss} enableCustomCss={formStyles.enableCustomCss} />
      
      {response && <AIResponse isLoading={true} response={response.content} type={response.type} onRegenerate={onRegenerate} />}
      {!response && (
        <form onSubmit={handleSubmit(onSubmit)} className={`form-${formStyles.selectedFormStyle}`}>
          <Button variant="link" onClick={()=>{
          setShowInfo(!showInfo);
        }} 
        className="absolute right-0">
          <BsFillInfoSquareFill className="w-5 h-5 text-gray-500" />
        </Button>
          {leadMagnet.image && (
        <div className="icon mx-auto mb-5 max-w-[100px] text-center">
          <Image src={leadMagnet.image} alt="Logo" width={100} height={100} />
        </div>
      )}
          {elementsList.map((element: any, index: number) => (
            <div className="form-item" key={index}>
              {renderElement(element)}
            </div>
          ))}

          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Submit
          </Button>
        </form>
      )}
      <div style={{ display: "none" }}>
       <FontPicker
        apiKey="AIzaSyAOSZtIN2QS_O1H3z6dsnle1rPBW7nxj9Y" // Replace with your actual API key
        activeFontFamily={formStyles.selectedFont} // Will be displayed in the FontPicker
      />
      </div>
    </FormWrapper>
  );
}
