import "@smartleadmagnet/ui/globals.css";
import { Providers } from "@/providers";
import { Toaster } from "@smartleadmagnet/ui/components/ui/toaster";
import { Toaster as ReactHotToast } from "react-hot-toast";
import Support from "@/components/Support";

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
        <Providers>{children}</Providers>
        <Toaster />
        <ReactHotToast />
        <Support />
      </body>
    </html>
  );
}
