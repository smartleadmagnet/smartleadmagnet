import { ChangeEvent, FC, useRef, useState } from "react";
import { Input } from "@smartleadmagnet/ui/components/ui/input";
import Icon from "@smartleadmagnet/ui/components/icon";
import { Button } from "@smartleadmagnet/ui/components/ui/button";

interface FormWithIconProps {
	value: string;
	// eslint-disable-next-line no-unused-vars
	setValue: (newValue: string) => void;
}

const EditableInput: FC<FormWithIconProps> = ({value, setValue}) => {
	const [isTyping, setIsTyping] = useState<boolean>(false);
	const inputRef = useRef<HTMLInputElement | null>(null); // Type for inputRef
	
	const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		const newValue = e.target.value;
		setValue(newValue); // Update the value from the parent
		setIsTyping(newValue.length > 0); // Hide the icon when the user starts typing
	};
	
	const handleIconClick = () => {
		setIsTyping(true); // Hide the icon when it's clicked
		inputRef.current?.focus(); // Focus on the input field
	};
	const inputWidth = value.length ? `${value.length * 10 + 30}px` : "220px";
	
	return (
		<div className="flex cm-form-input space-x-1">
			<Input
				value={value} // Control the value with props
				placeholder="Enter your Lead Magnet name"
				onChange={handleInputChange}
				ref={inputRef} // Attach ref to the input
				onKeyDownCapture={(e) => {
					if (e.key === "Enter") {
						e.preventDefault();
						inputRef.current?.blur(); // Remove focus
						setIsTyping(false); // Hide the icon
					}
				}} // Hide the icon when the user presses Enter also remove focus
				onBlur={() => setIsTyping(false)} // Hide the icon when the user clicks outside
				className="flex-grow min-w-0 m-0" // Adjust width dynamically
				style={{width: inputWidth}} // Adjust width dynamically
			/>
			{!isTyping && (
				<Button onClick={handleIconClick} className="py-1 pt-[5px]">
					<Icon name="edit"/>{" "}
				</Button>
			)}
		</div>
	);
};

export default EditableInput;
