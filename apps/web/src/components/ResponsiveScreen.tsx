import React, { ReactNode, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@smartleadmagnet/ui/components/ui/select";
import { Button } from "@smartleadmagnet/ui/components/ui/button";

interface ScreenNodeProps {
  children: ReactNode; // Define the type for children
  title: string; // Title for the screen
  width: string; // Width for the screen
}

const TitleBar: React.FC<{ title: string }> = ({ title }) => (
  <div className="flex items-center justify-between rounded-t-lg border-b bg-gray-700 p-2">
    <div className="flex space-x-2">
      <div className="h-3 w-3 rounded-full bg-red-500" />
      <div className="h-3 w-3 rounded-full bg-yellow-500" />
      <div className="h-3 w-3 rounded-full bg-green-500" />
    </div>
    <span className="text-white">{title}</span>
    <div className="h-3 w-3" />
    {/* Empty space for title bar */}
  </div>
);

const BrowserScreen: React.FC<ScreenNodeProps> = ({ children, title, width }) => (
  <div className={`relative  rounded-lg border border-gray-300 bg-white shadow-lg`} style={{ width: width }}>
    <TitleBar title={title} />
    <div className="h-[70vh] overflow-y-auto p-5">{children}</div>
  </div>
);

const ResponsiveScreen: React.FC<{ children: ReactNode; activeView: string; setActiveView: Function }> = ({
  children,
  activeView,
  setActiveView,
}) => {
  const [activeScreen, setActiveScreen] = useState("desktop");
  

  // Function to handle button click
  const handleClick = (screen: string) => {
    setActiveScreen(screen);
  };

  return (
    <div>
      {/* Two-column layout: Left select and Right 3-button group */}
      <div className="flex items-center justify-between space-x-4">
        {/* Left Select dropdown */}
        <div className="w-1/2">
          {/* <Select
            value={activeView}
            onValueChange={(value: any) => {
              setActiveView(value);
            }}
          >
            <SelectTrigger className="w-full rounded-md border px-3 py-2">
              <SelectValue>{activeView}</SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Form">Form</SelectItem>
              <SelectItem value="Prompt">Prompt</SelectItem>
            </SelectContent>
          </Select> */}
        </div>

        {/* Right 3-button group */}
        <div className="mb-[30px] inline-flex shadow-sm" role="group">
          <Button
            onClick={() => handleClick("desktop")}
            className={`
              rounded-l-lg
              rounded-r-none
              border
              border-gray-400
              bg-gray-300
              px-5
              py-2 text-sm
              text-gray-600
              transition-all
              duration-300
              ease-in-out
              hover:bg-gray-800 hover:text-white hover:shadow-lg
              ${activeScreen === "desktop" ? "bg-gray-800 text-white" : "text-gray-600"}
            `}
          >
            Desktop
          </Button>
          <Button
            onClick={() => handleClick("tablet")}
            className={`
              rounded-l-none
              rounded-r-none border
              border-gray-400
              bg-gray-300
              px-5
              py-2
              transition-all
              duration-300
              ease-in-out
              hover:bg-gray-800 hover:text-white hover:shadow-lg
              ${activeScreen === "tablet" ? "bg-gray-800 text-white" : "text-gray-600"}
            `}
          >
            Tablet
          </Button>
          <Button
            onClick={() => handleClick("mobile")}
            className={`
              rounded-l-none
              rounded-r-lg
              border
              border-gray-400 bg-gray-300
              px-5
              py-2
              transition-all
              duration-300
              ease-in-out
              hover:bg-gray-800 hover:text-white hover:shadow-lg
              ${activeScreen === "mobile" ? "bg-gray-800 text-white" : "text-gray-600"}
            `}
          >
            Mobile
          </Button>
        </div>
      </div>

      {/* Display the selected screen */}
      {activeScreen === "desktop" && (
        <BrowserScreen title="Desktop" width="100%">
          {children}
        </BrowserScreen>
      )}
      {activeScreen === "tablet" && (
        <BrowserScreen title="Tablet" width="767px">
          {children}
        </BrowserScreen>
      )}
      {activeScreen === "mobile" && (
        <BrowserScreen title="Mobile" width="500px">
          {children}
        </BrowserScreen>
      )}
    </div>
  );
};

export default ResponsiveScreen;
