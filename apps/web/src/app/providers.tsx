"use client";

import { ThemeProvider } from "next-themes";
import { TooltipProvider } from "@smartleadmagnet/ui/components/ui/tooltip";

export function Providers({children}: { children: React.ReactNode }) {
	return (
		<ThemeProvider attribute="class" enableSystem={false} defaultTheme="light">
			<TooltipProvider>
				{children}
			</TooltipProvider>
		</ThemeProvider>
	);
}
