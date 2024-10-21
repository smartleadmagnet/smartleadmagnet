import WebsiteLayout from "@/components/Layout/website";
import MessageWidget from "@/components/MessageWidget";


export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  

  
  return <WebsiteLayout>{children}
   <MessageWidget/>
  </WebsiteLayout>;
}
