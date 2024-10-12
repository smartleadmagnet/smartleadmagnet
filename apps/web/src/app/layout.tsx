import "@smartleadmagnet/ui/globals.css";
import { Providers } from "@/providers";


// const geistSans = localFont({
//   src: "./fonts/GeistVF.woff",
//   variable: "--font-geist-sans",
// });
// const geistMono = localFont({
//   src: "./fonts/GeistMonoVF.woff",
//   variable: "--font-geist-mono",
// });

export default function RootLayout({
	                                   children,
                                   }: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
		<body className={`bg-[#FCFCFC] dark:bg-black`}>
		<Providers>
			{children}
		</Providers>
		</body>
		</html>
	);
}

