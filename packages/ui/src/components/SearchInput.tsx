import { Input } from "./ui/input";
import  Icon  from "./icon";



interface SearchInputProps {
    placeholder?: string;
}

const SearchInput = (props:SearchInputProps) => {
    const { placeholder = "Search..." } = props;
  return (
    <div className="relative">
      <span className="absolute inset-y-0 left-0 flex items-center pl-3">
      <Icon name="search"   />
      </span>
      <Input
        type="text"
        placeholder={placeholder}
        className="pl-10" // Add padding to the left to accommodate the icon
      />
    </div>
  );
};

export default SearchInput;
