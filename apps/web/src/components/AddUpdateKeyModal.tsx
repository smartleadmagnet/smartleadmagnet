"use client";

import React,{useEffect} from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@smartleadmagnet/ui/components/ui/button";
import { Label } from "@smartleadmagnet/ui/components/ui/label";
import { Input } from "@smartleadmagnet/ui/components/ui/input";
import { Checkbox } from "@smartleadmagnet/ui/components/ui/checkbox";
import llm from "@/data/llm.json";
import { ApiKey } from "@smartleadmagnet/database";
import { FormItem,FormField } from "@smartleadmagnet/ui/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@smartleadmagnet/ui/components/ui/select";
import Icon from "@smartleadmagnet/ui/components/icon";
import { createKey,updateKey } from "@/actions/api-keys";
import * as z from "zod";
import { toast } from "@smartleadmagnet/ui/hooks/use-toast";
import { set } from "date-fns";

// Zod schema
const apiKeySchema = z.object({
  keyName: z.string().min(1, { message: "Key Name is required" }),
  apiKey: z.string().min(1, { message: "API Key is required" }),
  provider: z.string().min(1, { message: "Provider is required" }),
  isDefault: z.boolean(),
});

interface AddUpdateKeyModalProps {
  isEditing?: boolean;
  keyData?:ApiKey;
  setKeyData:Function

}

const AddUpdateKeyModal = (props:AddUpdateKeyModalProps) => {
  const { isEditing = false ,keyData,setKeyData} = props;
  const [isOpen, setIsOpen] = React.useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue, // Used to programmatically set form values
    getValues, // To get current values for rendering
    reset,
    control,
    
  } = useForm({
    resolver: zodResolver(apiKeySchema), // Use Zod resolver
    defaultValues: {
      keyName:  "",
      apiKey:  "",
      provider:   "",
      isDefault:  false, // Default value for isDefault
    },
  });


  

  useEffect(() => {
    if(keyData){
      reset({
        keyName: keyData.keyName,
        apiKey: keyData.apiKey,
        provider: keyData.provider,
        isDefault: keyData.isDefault
      })
    }
    else{
      reset({
        keyName:  "",
        apiKey:  "",
        provider:   "",
        isDefault:  false, // Default value for isDefault
      })
    }
  }, [keyData,reset]);

  const toggleModal = () => {
    if(isEditing){
      setKeyData(null)
      return
    }
    setIsOpen(!isOpen);
  };

  const onSubmit = async (data: any) => {
    try {
      if(isEditing){
        
        
        await updateKey(keyData?.id,data); // Submit all form data
      } 
      else{  
      await createKey(data); // Submit all form data
      }
      
    
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "There was an error submitting the form",
      });
    }
    reset();
    setIsOpen(false);
    setKeyData(null)
  };

  return (
    <>
      
      <Button className="btn-primary" onClick={() => {setIsOpen(true)}}>
        + Add Key
      </Button>
      
        <div
          className={`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 ${isOpen || isEditing ? "block" : "hidden"}`}
          onClick={toggleModal}
        >
          <div
            className="relative w-full max-w-xl rounded-lg bg-white p-6 shadow-lg"
            onClick={(e) => e.stopPropagation()} // Prevent closing on content click
          >
            <button className="absolute right-4 top-4 p-1 text-white" onClick={toggleModal}>
              <Icon name="close" />
            </button>

            <div className="mb-6 text-center">
              <div className="modal-header inline-flex w-full items-center justify-center rounded-t-lg bg-gradient-to-r from-orange-500 to-pink-500 py-4 text-white">
                <h2 className="text-2xl font-semibold">{isEditing?"Edit API KEY":"Add New API Key"}</h2>
              </div>
            </div>

            <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
              <FormItem>
                <Label className="mb-2 block text-sm font-semibold">Key Name</Label>
                <Input {...register("keyName")} type="text" placeholder="Enter Key Name" className="w-full" />
                {errors.keyName && <p className="text-red-500">{errors.keyName.message}</p>}
              </FormItem>

              

              <FormField
          control={control}
          name="provider"
          render={({ field }) => (
            <FormItem>
                <Label className="mb-2 block text-sm font-semibold">API Key Provider</Label>
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select an option" />
                  </SelectTrigger>
                  <SelectContent>
                    {llm?.map((item) => (
                      <SelectItem key={item.name} value={item.name}>
                        {item.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.provider && <p className="text-red-500">{errors.provider.message}</p>}
              </FormItem>
          )}
        />

              <FormItem>
                <Label className="mb-2 block text-sm font-semibold">API Key</Label>
                <Input {...register("apiKey")} type="text" placeholder="Enter API Key" className="w-full" />
                {errors.apiKey && <p className="text-red-500">{errors.apiKey.message}</p>}
              </FormItem>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="isDefault"
                  checked={getValues("isDefault")} // Get the current value from form state
                  onCheckedChange={(checked) => setValue("isDefault", checked)} // Use setValue to update
                />
                <Label htmlFor="isDefault" className="text-sm font-medium">
                  Set as Default
                </Label>
              </div>

              <div className="mt-4 flex justify-end">
                <Button type="button" variant="secondary" className="mr-2 border" onClick={toggleModal}>
                  Cancel
                </Button>
                <Button type="submit" className="btn-primary">
                  {isEditing?"Update Key":"Add Key"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      
    </>
  );
};

export default AddUpdateKeyModal;
