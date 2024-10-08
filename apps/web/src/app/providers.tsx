"use client";

import { ThemeProvider } from "next-themes";
import { TooltipProvider } from "@smartleadmagnet/ui/components/ui/tooltip";
import { ReactNode } from "react";
import { LayoutProvider } from "@/app/context/LayoutContext";

export function Providers({children}: { children: ReactNode }) {
	return (
		<LayoutProvider>
			<ThemeProvider attribute="class" enableSystem={false} defaultTheme="light">
				<TooltipProvider>
					{children}
				</TooltipProvider>
			</ThemeProvider>
		</LayoutProvider>
	);
}
