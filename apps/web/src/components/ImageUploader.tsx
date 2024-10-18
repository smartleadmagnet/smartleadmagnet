import React, { useState } from "react";
import { Controller } from "react-hook-form";
import { useDropzone } from "react-dropzone";
import { Label } from "@smartleadmagnet/ui/components/ui/label";

function ImageUploader({ element, control, errors }) {
  const [imagePreview, setImagePreview] = useState(null);

  const onDrop = (acceptedFiles, field) => {
    const file = acceptedFiles[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        field.onChange(reader.result);
        setImagePreview(reader.result); // Set image preview URL
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <Label className="mb-2 block text-sm font-semibold">{element.label}</Label>
      <Controller
        name={element.name}
        control={control}
        rules={{ required: element.required ? `${element.label} is required` : false }}
        render={({ field }) => {
          const { getRootProps, getInputProps } = useDropzone({
            onDrop: (acceptedFiles) => onDrop(acceptedFiles, field),
            accept: "image/*",
          });

          return (
            <div
              {...getRootProps({
                className:
                  "relative w-full bg-white p-4 border-dashed border-2 border-gray-300 rounded-md text-center cursor-pointer",
              })}
            >
              <input {...getInputProps()} />
              <p className="text-sm text-gray-500">Drag & drop an image here, or click to select</p>
              {imagePreview && (
                <img src={imagePreview} alt="Selected Preview" className="mt-2 h-32 w-auto object-contain" />
              )}
            </div>
          );
        }}
      />
      {errors[element.name] && <span className="text-red-500">{errors[element.name]?.message}</span>}
    </div>
  );
}

export default ImageUploader;
