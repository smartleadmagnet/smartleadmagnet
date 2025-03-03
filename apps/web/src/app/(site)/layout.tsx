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
        <Script id="yandex-metrika" strategy="afterInteractive">
          {`
            (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
            m[i].l=1*new Date();
            for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
            k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
            (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

            ym(99406206, "init", {
              clickmap:true,
              trackLinks:true,
              accurateTrackBounce:true
            });
          `}
        </Script>
        <Script src="https://cdnapp.websitepolicies.net/widgets/cookies/jdp5ngx4.js" defer></Script>
        <noscript>
          <div>
            <img 
              src="https://mc.yandex.ru/watch/99406206" 
              style={{ position: 'absolute', left: '-9999px' }} 
              alt="" 
            />
          </div>
        </noscript>
        <Providers>{children}</Providers>
        <Toaster />
        <ReactHotToast />
        <Support />
        <Analytics />
      </body>
    </html>
  );
}
