"use client";

import FontPicker from "font-picker-react";

interface FontSelectorProps {
  activeFontFamily: string;
  onChange: (fontFamily: string) => void; // Use onChange as the callback
}

const FontSelector = (props: FontSelectorProps) => {
  const { activeFontFamily, onChange } = props; // Destructure onChange

  return (
    <div>
      <FontPicker
        apiKey="AIzaSyAOSZtIN2QS_O1H3z6dsnle1rPBW7nxj9Y" // Replace with your actual API key
        activeFontFamily={activeFontFamily}
        onChange={(nextFont) => onChange(nextFont.family)} // Call onChange instead
      />
    </div>
  );
};

export default FontSelector;
