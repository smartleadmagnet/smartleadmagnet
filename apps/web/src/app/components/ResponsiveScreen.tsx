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

const TitleBar: React.FC<{ title: string }> = ({title}) => (
	<div className="flex items-center justify-between p-2 bg-gray-700 rounded-t-lg border-b">
		<div className="flex space-x-2">
			<div className="w-3 h-3 bg-red-500 rounded-full"/>
			<div className="w-3 h-3 bg-yellow-500 rounded-full"/>
			<div className="w-3 h-3 bg-green-500 rounded-full"/>
		</div>
		<span className="text-white">{title}</span>
		<div className="w-3 h-3"/>
		{/* Empty space for title bar */}
	</div>
);

const BrowserScreen: React.FC<ScreenNodeProps> = ({children, title, width}) => (
	<div className={`relative  bg-white rounded-lg shadow-lg border border-gray-300`} style={{width: width}}>
		<TitleBar title={title}/>
		<div className="h-[70vh] p-5 overflow-y-auto">{children}</div>
	</div>
);

const ResponsiveScreen: React.FC<{ children: ReactNode, activeView: string, setActiveView: Function }> = ({
	                                                                                                          children,
	                                                                                                          activeView,
	                                                                                                          setActiveView
                                                                                                          }) => {
	const [activeScreen, setActiveScreen] = useState("desktop");
	
	// Function to handle button click
	const handleClick = (screen: string) => {
		setActiveScreen(screen);
	};
	
	return (
		<div>
			{/* Two-column layout: Left select and Right 3-button group */}
			<div className="flex justify-between items-center space-x-4">
				{/* Left Select dropdown */}
				<div className="w-1/2">
					<Select value={activeView} onValueChange={(value: any) => {
						setActiveView(value)
					}}>
						<SelectTrigger className="w-full border rounded-md px-3 py-2">
							<SelectValue>{activeView}</SelectValue>
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="Form">Form</SelectItem>
							<SelectItem value="Prompt">Prompt</SelectItem>
						</SelectContent>
					</Select>
				</div>
				
				{/* Right 3-button group */}
				<div className="inline-flex shadow-sm mb-[30px]" role="group">
					<Button
						onClick={() => handleClick("desktop")}
						className={`
              bg-gray-300
              rounded-l-lg
              text-sm
              text-gray-600
              px-5
              py-2
              border border-gray-400
              hover:bg-gray-800
              hover:text-white
              hover:shadow-lg
              rounded-r-none
              transition-all duration-300 ease-in-out
              ${activeScreen === "desktop" ? "bg-gray-800 text-white" : "text-gray-600"}
            `}
					>
						Desktop
					</Button>
					<Button
						onClick={() => handleClick("tablet")}
						className={`
              bg-gray-300
              border border-gray-400
              py-2
              px-5
              hover:bg-gray-800
              rounded-l-none
              rounded-r-none
              hover:text-white
              hover:shadow-lg
              transition-all duration-300 ease-in-out
              ${activeScreen === "tablet" ? "bg-gray-800 text-white" : "text-gray-600"}
            `}
					>
						Tablet
					</Button>
					<Button
						onClick={() => handleClick("mobile")}
						className={`
              bg-gray-300
              px-5
              py-2
              border border-gray-400
              rounded-r-lg
              rounded-l-none
              hover:bg-gray-800
              hover:text-white
              hover:shadow-lg
              transition-all duration-300 ease-in-out
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
				<BrowserScreen title="Mobile" width="400px">
					{children}
				</BrowserScreen>
			)}
		</div>
	);
}

export default ResponsiveScreen;
