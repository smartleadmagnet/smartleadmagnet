import React, { useState } from "react";
import Icon from "@smartleadmagnet/ui/components/icon";
import { Button } from "@smartleadmagnet/ui/components/ui/button";
import { Label } from "@smartleadmagnet/ui/components/ui/label";
import { Input } from "@smartleadmagnet/ui/components/ui/input";
import { Checkbox } from "@smartleadmagnet/ui/components/ui/checkbox";

import { Form, FormItem } from "@smartleadmagnet/ui/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@smartleadmagnet/ui/components/ui/select";

interface EmbedModalProps {
  open: boolean;
  setIsOpen: (open: boolean) => void;
}

const AddKeyModal = (props: EmbedModalProps) => {
  const { open, setIsOpen } = props;
  const [selectedKey, setSelectedKey] = useState<string>("Open AI"); // Default selection
  const [isDefault, setIsDefault] = useState<boolean>(false);

  const toggleModal = () => {
    setIsOpen(!open);
  };

  const handleSubmit = () => {
    // Handle key submission logic here
    console.log("Selected Key:", selectedKey);
    console.log("Set as Default:", isDefault);
    // Close the modal after submission
    toggleModal();
  };

  return (
    <>
      {/* Modal Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={toggleModal}
        >
          {/* Modal Content */}
          <div
            className="relative bg-white p-6 rounded-lg shadow-lg w-full max-w-xl"
            onClick={(e) => e.stopPropagation()} // Prevent closing on content click
          >
            {/* Close Button */}
            <button
              className="absolute top-4 right-4 p-1 text-white"
              onClick={toggleModal}
            >
              <Icon name="close" />
            </button>

            {/* Modal Title with Gradient Background */}
            <div className="text-center mb-6">
              <div className="modal-header inline-flex items-center justify-center w-full py-4 bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-t-lg">
                <h2 className="text-2xl font-semibold">Add New Api Key</h2>
              </div>
            </div>
            <form className="space-y-4">
              <FormItem>
                <Label className="text-sm font-semibold mb-2 block">
                  Key Name
                </Label>
                <Input
                  type="text"
                  placeholder="Enter Key Name"
                  className="w-full"
                />
              </FormItem>
              <FormItem>
                <Label className="text-sm font-semibold mb-2 block">
                  API Key Provider
                </Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select an option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="option1">Option 1</SelectItem>
                  </SelectContent>
                </Select>
              </FormItem>
              <FormItem>
                <Label className="text-sm font-semibold mb-2 block">
                  API Key
                </Label>
                <Input
                  type="text"
                  placeholder="Enter API Key"
                  className="w-full"
                />
              </FormItem>
              <div className="flex items-center space-x-2">
                <Checkbox id="terms2" disabled />
                <Label
                  htmlFor="terms2"
                  className="text-sm font-medium"
                >
                  Set as Default
                </Label>
              </div>
            </form>

            {/* Submit and Cancel Buttons */}
            <div className="mt-4 flex justify-end">
              <Button
                className="mr-2"
                variant="secondary"
                onClick={toggleModal}
              >
                Cancel
              </Button>
              <Button className="btn-primary" onClick={handleSubmit}>
                Submit
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AddKeyModal;
