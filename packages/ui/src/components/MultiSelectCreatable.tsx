import React from "react";
import Select, { MultiValue, ActionMeta } from "react-select";
import CreatableSelect from "react-select/creatable";

interface Option {
  label: string;
  value: string;
}

interface MultiSelectCreatableProps {
  options: Option[]; // Options passed via props
  onChange: (
    selectedOptions: MultiValue<Option>,
    actionMeta: ActionMeta<Option>
  ) => void; // Callback for change event
  placeholder?: string; // Optional placeholder
}

const MultiSelectCreatable: React.FC<MultiSelectCreatableProps> = ({
  options,
  onChange,
  placeholder,
}) => {
  return (
    <CreatableSelect
      isMulti
      value={options} // Data passed from props
      onChange={onChange} // Handle change
      placeholder={placeholder || "Create a new option"} // Placeholder if provided
      classNamePrefix="react-select"
      noOptionsMessage={() => "Type to create a new option"}
    />
  );
};

export default MultiSelectCreatable;
