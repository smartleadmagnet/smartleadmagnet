import { useState } from "react";
import { MentionsInput, Mention } from "react-mentions";

interface Props {
	options: { id: string; display: string }[];
	onPromptChange: Function;
	defaultValue?: string;
}

export default function MentionTextArea({options, onPromptChange, defaultValue}: Props) {
	const [value, setValue] = useState(defaultValue!);
	
	const handleChange = (event: any) => {
		const value = event.target.value;
		setValue(value);
		onPromptChange(value);
	};
	
	return (
		<div
			className="mention-text-area-box flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 mb-[10px]">
			<MentionsInput
				value={value}
				onChange={handleChange}
				placeholder="With {{appName}}, manage projects seamlessly by breaking tasks into actionable steps, assigning responsibilities, and tracking progress in real-time, all while keeping your team in sync."
				className="min-h-[200px] min-w-full focus:outline-none"
				style={{
					highlighter: {
						overflow: "hidden",
					},
					suggestions: {
						list: {
							backgroundColor: "white",
							border: "1px solid rgba(0,0,0,0.15)",
							borderRadius: "4px",
							zIndex: 1000,
						},
						item: {
							padding: "5px 10px",
							borderBottom: "1px solid #ddd",
							cursor: "pointer",
							"&focused": {
								backgroundColor: "#007BFF",
								color: "white",
							},
						},
					},
				}}
			>
				<Mention
					trigger="{"
					data={options}
					style={{
						backgroundColor: "#daf4fa",
					}}
					appendSpaceOnAdd
				/>
			</MentionsInput>
		</div>
	
	);
}
