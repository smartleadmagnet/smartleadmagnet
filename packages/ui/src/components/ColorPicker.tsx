import { SketchPicker } from "react-color";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

interface ColorPickerProps {
  color: string; // Accept a color prop as a string
  onChange: (color: string) => void; // Callback to handle color change
  label: string;
}

const ColorPicker: React.FC<ColorPickerProps> = ({ color, onChange,label }) => {
  const handleColorChange = (newColor: { hex: string }) => {
    onChange(newColor.hex); // Pass the selected color back to the parent component
  };

  return (
    <div >
    <Label>{label}</Label>
    <div className="flex items-center   space-x-2">
      <Input
        value={color}
        className="w-[150px]"
        onChange={(e) => {
          onChange(e.target.value);
        }}
      />
      <Popover>
        <PopoverTrigger asChild>
          <div
            className="w-12 h-12 rounded-full cursor-pointer border border-gray-300"
            style={{ backgroundColor: color }}
          />
        </PopoverTrigger>
        <PopoverContent className="color-picker-popup">
          <SketchPicker
            color={color}
            onChangeComplete={handleColorChange} // Handle color change
          />
        </PopoverContent>
      </Popover>
    </div>
    </div>  
  );
};

export default ColorPicker;
