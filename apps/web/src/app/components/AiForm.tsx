
import { Button } from "@smartleadmagnet/ui/components/ui/button";
import { Input } from "@smartleadmagnet/ui/components/ui/input";
import { Textarea } from "@smartleadmagnet/ui/components/ui/textarea";
import { Label } from "@smartleadmagnet/ui/components/ui/label";
import { Checkbox } from "@smartleadmagnet/ui/components/ui/checkbox";
import { useLayoutContext } from "../context/LayoutContext";
import MentionTextArea from "@smartleadmagnet/ui/components/MentionTextArea";


import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@smartleadmagnet/ui/components/ui/select";
import {
  RadioGroup,
  RadioGroupItem,
} from "@smartleadmagnet/ui/components/ui/radio-group";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@smartleadmagnet/ui/components/ui/popover";

export default function AIForm() {
  const { elementsList } = useLayoutContext();
  return (
    <div className="w-full flex flex-col bg-white p-4 rounded-md justify-between relative">
      <div className="flex flex-col overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-100 p-1">
        {/* Pulse Button */}
        <Button
          variant="outline"
          className="pulse-button mb-4 flex items-center"
        >
          <svg
            stroke="currentColor"
            fill="currentColor"
            strokeWidth="0"
            viewBox="0 0 24 24"
            className="text-lg"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Icon */}
            <path d="m11 4-.5-1-.5 1-1 .125.834.708L9.5 6l1-.666 1 .666-.334-1.167.834-.708zm8.334 10.666L18.5 13l-.834 1.666-1.666.209 1.389 1.181L16.834 18l1.666-1.111L20.166 18l-.555-1.944L21 14.875zM6.667 6.333 6 5l-.667 1.333L4 6.5l1.111.944L4.667 9 6 8.111 7.333 9l-.444-1.556L8 6.5zM3.414 17c0 .534.208 1.036.586 1.414L5.586 20c.378.378.88.586 1.414.586s1.036-.208 1.414-.586L20 8.414c.378-.378.586-.88.586-1.414S20.378 5.964 20 5.586L18.414 4c-.756-.756-2.072-.756-2.828 0L4 15.586c-.378.378-.586.88-.586 1.414zM17 5.414 18.586 7 15 10.586 13.414 9 17 5.414z"></path>
          </svg>
          <span className="mx-4">Generate tool with AI</span>
        </Button>

        {/* Modal */}
        {/* <Modal>
            <h3 className="font-bold text-2xl mb-2">Generate your tool with AI</h3>
            <p className="mb-4">Describe what data you want to collect, what the tool should do and let AI build it for you.</p>
            <div className="form-control mt-2 mb-5">
              <Label htmlFor="tool-description" className="font-bold">Describe a tool you want to build</Label>
              <Textarea
                id="tool-description"
                placeholder="I want to create a meal plan generator..."
                className="min-h-[100px] leading-6 min-w-full"
              />
            </div>
            <div className="alert bg-primary/20 mb-4 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
              <span className="text-sm text-left w-full">This action will overwrite the current data inside the Builder.</span>
            </div>
            <div className="modal-action flex justify-between">
              <Button variant="ghost">Cancel</Button>
              <Button variant="primary">Generate</Button>
            </div>
          </Modal> */}

        {/* AI Prompt Section */}
        
        <div className="form-control w-full max-w-xl">
          <div className="flex w-full justify-between items-center mb-[10px]">
            <Label>Prompt</Label>
            {/* <div className="flex gap-2">
              <Button variant="outline" size="sm">
                Advanced
              </Button>
              <Button size="sm">Upload files</Button>
            </div> */}
          </div>
          <MentionTextArea 
            options={elementsList
              .filter(item => item.formElement)
              .map(element => ({
                id: element.name,
                display: "{{"+element.name+"}}"
              }))
            }
            
          />
        </div>

        {/* Variables Section */}
        <div className="w-full max-w-xl mb-4">
          <ul className="list-disc text-sm">
            <li>
              Variables:{" "}
              <small>{elementsList.filter(item=> item.formElement).map(element=> (
                <span className="bg-gray-300 px-2 py-1 inline-block rounded mr-2" key={element.id}>{"{{"} {element.name} {"}}"}</span>
              ))}</small>
            </li>
          </ul>
        </div>


        {/* Output Type and Provider */}
        <div className="flex gap-2 w-full">
          <div className="form-control w-full mb-4">
            <Label>Output Type</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select a fruit" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Fruits</SelectLabel>
                  <SelectItem value="apple">Apple</SelectItem>
                  <SelectItem value="banana">Banana</SelectItem>
                  <SelectItem value="blueberry">Blueberry</SelectItem>
                  <SelectItem value="grapes">Grapes</SelectItem>
                  <SelectItem value="pineapple">Pineapple</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="form-control w-full mb-4">
            <Label>Provider</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select a fruit" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Fruits</SelectLabel>
                  <SelectItem value="apple">Apple</SelectItem>
                  <SelectItem value="banana">Banana</SelectItem>
                  <SelectItem value="blueberry">Blueberry</SelectItem>
                  <SelectItem value="grapes">Grapes</SelectItem>
                  <SelectItem value="pineapple">Pineapple</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* API Usage Section */}
        <div className="w-full flex flex-col gap-2">
          <div className="bg-white rounded-lg p-3 border w-full border-primary">
            <div className="flex justify-between items-center mb-1">
              <span className="font-semibold text-gray-700">API Usage</span>
              <Button>Manage API keys</Button>
            </div>
            <div className="flex gap-2">
              <RadioGroup defaultValue="comfortable">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="default" id="r1" />
                  <Label htmlFor="r1">Default</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="comfortable" id="r2" />
                  <Label htmlFor="r2">Comfortable</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="compact" id="r3" />
                  <Label htmlFor="r3">Compact</Label>
                </div>
              </RadioGroup>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
