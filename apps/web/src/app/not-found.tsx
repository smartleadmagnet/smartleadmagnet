import Link from "next/link";
import React from "react";
import Image from "next/image";

export default function NotFound() {
	return (
		<div className="p-4 size-full flex items-center justify-center bg-gray-100 min-w-fit min-h-screen flex-col">
			<div className="flex flex-col">
				<Image src="/404.png" width={800} height={500} alt=""/>
				<h2 className="text-3xl mt-20 flex items-center justify-center">Oops! Looks like you took a wrong turn</h2>
			</div>
			<div className="m-10">
				<Link className="bg-primary text-primary-foreground hover:bg-primary/90 h-11 rounded-md px-8 inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50" data-text="Back To Home" href="/">
					Back To Home
				</Link>
			</div>
		</div>
	);
}
