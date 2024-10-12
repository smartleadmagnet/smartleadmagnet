import { useRef, useState } from "react";
import { Mention, MentionsInput } from "react-mentions";
import { Badge } from "@smartleadmagnet/ui/components/ui/badge";

interface Props {
  options: { id: string; display: string }[];
  onPromptChange: Function;
  defaultValue?: string;
}

export default function MentionTextArea({options, onPromptChange, defaultValue}: Props) {
  const [value, setValue] = useState(defaultValue || "");
  const mentionInputRef = useRef<any>(null); // To track the ref of MentionsInput for cursor position
  const [caretPosition, setCaretPosition] = useState(0); // State to hold caret position

  const handleChange = (event: any) => {
    const value = event.target.value;
    setValue(value);
    onPromptChange(value);
  };

  // Function to handle insertion of variable at caret position
  const insertVariable = (variable: string) => {
    const textBeforeCaret = value.slice(0, caretPosition);
    const textAfterCaret = value.slice(caretPosition);
    const newValue = `${textBeforeCaret}${variable} ${textAfterCaret}`; // Insert variable and a space

    setValue(newValue);
    onPromptChange(newValue);

    // Focus the input box after insertion
    setTimeout(() => {
      mentionInputRef.current.focus();
    }, 0);
  };

  // Function to track caret position
  const handleCaretChange = (event: any) => {
    const caretPos = event.target.selectionStart;
    setCaretPosition(caretPos);
  };

  return (
    <>
      <div
        className="mention-text-area-box border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring mb-[10px] flex w-full rounded-md border px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
        <MentionsInput
          ref={mentionInputRef}
          value={value}
          onChange={handleChange}
          onClick={handleCaretChange} // Track caret position on click
          onKeyUp={handleCaretChange} // Track caret position on keyup
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

      {/* Variables Section */}
      <div className="mb-4 w-full max-w-xl">
        <ul className="list-disc text-sm">
          <li>
            Variables:{" "}
            <small>
              {options.map((element: any) => (
                <Badge
                  className="mr-2 inline-block cursor-pointer rounded px-2 py-1"
                  key={element.id}
                  onClick={() => insertVariable(element.display)} // Insert variable on click
                >
                  {element.display}
                </Badge>
              ))}
            </small>
          </li>
        </ul>
      </div>
    </>
  );
}
