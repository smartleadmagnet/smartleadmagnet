import { Input } from "./ui/input";
import Icon from "./icon";

interface SearchInputProps {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
}

const SearchInput = (props: SearchInputProps) => {
  const { placeholder = "Search..." } = props;
  return (
    <div className="relative w-full max-w-lg">
      {/* Icon on the left side */}
      <span className="absolute inset-y-0 left-0 flex items-center pl-4">
        <Icon name="search" />
      </span>

      {/* Large Input Field */}
      <Input
        type="text"
        placeholder={placeholder}
        value={props.value}
        onChange={(e) => props.onChange?.(e.target.value)}
        className="w-full rounded-lg border border-gray-300 py-3 pl-12 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
};

export default SearchInput;
