import React from "react";
import Select, { ActionMeta, MultiValue } from "react-select";

interface Option {
  label: string;
  value: string;
}

interface MultiSelectCreatableProps {
  options: Option[]; // Options passed via props
  value: Option[]; // Value passed via props
  onChange: (selectedOptions: MultiValue<Option>, actionMeta: ActionMeta<Option>) => void; // Callback for change event
  placeholder?: string; // Optional placeholder
}

const MultiSelect: React.FC<MultiSelectCreatableProps> = ({ options, onChange, placeholder, value }) => {
  return (
    <Select
      isMulti
      options={options} // Data passed from props
      value={value}
      onChange={onChange} // Handle change
      placeholder={placeholder || "Select an Option"} // Placeholder if provided
      classNamePrefix="react-select"
    />
  );
};

export default MultiSelect;
