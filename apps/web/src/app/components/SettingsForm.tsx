import { Button } from "@smartleadmagnet/ui/components/ui/button";
import { Input } from "@smartleadmagnet/ui/components/ui/input";
import { Textarea } from "@smartleadmagnet/ui/components/ui/textarea";
import { Label } from "@smartleadmagnet/ui/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@smartleadmagnet/ui/components/ui/select";
import { useState } from "react";

export default function SettingsForm() {
  // State for form fields
  const [formData, setFormData] = useState({
    iconImage: "",
    title: "",
    subtitle: "",
    description: "",
    category: "",
  });

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="w-full flex flex-col bg-white p-4 rounded-md">
      {/* Icon Image Upload */}
      <div className="form-control w-full mb-4">
      <Label className="text-sm font-semibold mb-[10px] block">
              Icon Image
            </Label>

            <div className="flex items-center justify-center w-full h-40 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 transition-colors duration-200">
              <Input
                type="file"
                accept="image/*" // Accepts image files only
                className="hidden" // Hides the actual file input
                onChange={() => {
               }}
              />
              <label
                htmlFor="file-upload"
                className="flex flex-col items-center justify-center w-full h-full cursor-pointer text-gray-500 p-4"
              >
                
                <span className="mt-2 text-sm">
                  Drag and drop an image here, or click to select one
                </span>
              </label>
            </div>

            <p className="text-xs text-gray-500 mt-2">
              Please upload an image (JPG, PNG, GIF).
            </p>
      </div>

      {/* Title Input */}
      <div className="form-control w-full mb-4">
        <Label>Title</Label>
        <Input
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Enter title"
        />
      </div>

      {/* Subtitle Input */}
      <div className="form-control w-full mb-4">
        <Label>Subtitle</Label>
        <Input
          name="subtitle"
          value={formData.subtitle}
          onChange={handleChange}
          placeholder="Enter subtitle"
        />
      </div>

      {/* Description Textarea */}
      <div className="form-control w-full mb-4">
        <Label>Description</Label>
        <Textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Enter description"
        />
      </div>

      {/* Category Select */}
      <div className="form-control w-full mb-4">
        <Label>Category</Label>
        <Select
          onValueChange={(value) => setFormData({ ...formData, category: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Categories</SelectLabel>
              <SelectItem value="category1">Category 1</SelectItem>
              <SelectItem value="category2">Category 2</SelectItem>
              <SelectItem value="category3">Category 3</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      {/* Submit Button */}
      <Button
        className="mt-4"
        onClick={() => console.log(formData)}
      >
        Save Settings
      </Button>
    </div>
  );
}
