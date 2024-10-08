import  { useState } from "react";
import { MentionsInput, Mention } from "react-mentions";

interface Props {
  options: { id: string; display: string }[];
}

export default function MentionTextArea({ options }: Props) {
  const [value, setValue] = useState("");

  const handleChange = (event: any) => {
    setValue(event.target.value);
  };

  

  

  return (
    <div className="mention-text-area-box flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 mb-[10px]">
      <MentionsInput
        value={value}
        onChange={handleChange}
        placeholder="Generate a meal plan considering I am a {{age}} years old {{gender}}"
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
