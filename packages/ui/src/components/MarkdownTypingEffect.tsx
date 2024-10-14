import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";

type Props = {
  text: string;
};

const TypingMarkdown: React.FC<Props> = ({ text }) => {
  const [displayedText, setDisplayedText] = useState<string>("");
  const [index, setIndex] = useState<number>(0);

  useEffect(() => {
    // Clear the displayed text and reset index when the text prop changes
    setDisplayedText("");
    setIndex(0);
  }, [text]); // Dependency on `text` ensures reset on text change

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    if (index < text.length) {
      timeoutId = setTimeout(() => {
        setDisplayedText((prev) => prev + text.charAt(index));
        setIndex((prev) => prev + 1);
      }, 5); // Adjust typing speed
    }

    return () => clearTimeout(timeoutId); // Cleanup to prevent memory leaks if the component unmounts or text changes
  }, [index, text]);

  return (
    <div className="markdown-container">
      <ReactMarkdown>{displayedText}</ReactMarkdown>
    </div>
  );
};

export default TypingMarkdown;
