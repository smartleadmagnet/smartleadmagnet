import "@smartleadmagnet/ui/globals.css";
import { Providers } from "@/providers";
import { Toaster } from "@smartleadmagnet/ui/components/ui/toaster";
import { Toaster as ReactHotToast } from "react-hot-toast";
import Support from "@/components/Support";
import Analytics from "@/components/Analytics";
import Script from "next/script";

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
        <Script
          async
          src="https://cdn.promotekit.com/promotekit.js"
          data-promotekit="133f2e2d-f2b7-4230-93e1-9dbccefbe3c3"
        />
        <Providers>{children}</Providers>
        <Toaster />
        <ReactHotToast />
        <Support />
        <Analytics />
      </body>
    </html>
  );
}
