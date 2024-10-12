"use client";

import { ThemeProvider } from "next-themes";
import { TooltipProvider } from "@smartleadmagnet/ui/components/ui/tooltip";
import { ReactNode } from "react";

export function Providers({children}: { children: ReactNode }) {
	return (
		<ThemeProvider attribute="class" enableSystem={false} defaultTheme="light">
			<TooltipProvider>
				{children}
			</TooltipProvider>
		</ThemeProvider>
	);
}
