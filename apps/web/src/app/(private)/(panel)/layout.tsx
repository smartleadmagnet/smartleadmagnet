import Link from "next/link";
import Image from "next/image";
import {
  Home,
  LineChart,
  PanelLeft,
  Settings,
  Users2,
  ChevronDown,
} from "lucide-react";
import { templateCategories } from "@smartleadmagnet/ui/lib/constants";

import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@smartleadmagnet/ui/components/ui/sheet";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@smartleadmagnet/ui/components/ui/tooltip";
import { NavItem } from "./nav-item";
import { getSessionUser } from "@/services/user";
import { redirect } from "next/navigation";
import { Button } from "@smartleadmagnet/ui/components/ui/button";
import { User } from "@/components/User";

const CategoryGrid = () => {
  const itemsPerRow = 4; // Change this to adjust items per row

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {templateCategories.map((category, index) => (
        <div key={category.id} className="cat-item">
          <Link href={`/templates/${category.id}`}>{category.name}</Link>
        </div>
      ))}
    </div>
  );
};

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getSessionUser();
  // @ts-ignore
  if (!user?.id) {
    return redirect("/login");
  }

  

  return (
    <main className="flex min-h-screen w-full flex-col bg-muted/40">
      <div className="flex flex-col sm:gap-4 ">
        <header className="sticky top-0 z-30 flex items-center gap-4 sm:py-2 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:px-6 bg-gray-900 h-36 ">
          <MobileNav />
          <div className="flex-1">
            <Link href="/">
            <Image
              src="/images/logo/logo.png"
              alt="Logo"
              width={200}
              height={0}
            />
            </Link>
          </div>
          <DesktopNav />
          <div className="flex-1 flex justify-end items-end">
            <User />
          </div>
        </header>
        <main className="flex flex-col">{children}</main>
      </div>
    </main>
  );
}

function DesktopNav() {
  return (
    <div className="flex-1 hidden md:block">
      <ul className="flex space-x-5 text-white justify-center items-center text-center">
        <li>
          <Link href="/" className="hover:text-gray-500">
            Home
          </Link>
        </li>
        <li className="group">
          <Link
            href="/templates"
            className="flex items-center hover:text-gray-500"
          >
            Templates <ChevronDown className="h-4 w-4 ml-1 pt-1" />
          </Link>
          <div className="mega-menu">
            <CategoryGrid />
          </div>
        </li>
        <li>
          <Link href="/pricing" className="hover:text-gray-500">
            Pricing
          </Link>
        </li>
        <li>
          <Link href="/blog" className="hover:text-gray-500">
            Blog
          </Link>
        </li>
      </ul>
    </div>
  );
}

function MobileNav() {
  return (
    <Sheet >
      <SheetTrigger asChild>
        <Button size="icon" variant="outline" className="sm:hidden">
          <PanelLeft className="h-5 w-5" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="sm:max-w-xs bg-gray-900 mobile-menu">
        <nav className="grid gap-6 text-lg font-medium">
          <Link
            href="#"
            className="mobile-link"
          >
            
            Home
          </Link>
          <div>
          <Link
            href="#"
            className="mobile-link"
          >
            
            Templates
          </Link>
          <ul className="ml-4 mt-2 space-y-2">
              {templateCategories.map((category) => (
                <li key={category.id}>
                  <Link
                    href={`/templates/${category.id}`}
                    className="block mobile-link text-md"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
            </div>  
          <Link
            href="#"
            className="mobile-link"
          >
              
              Pricing
          </Link>
          <Link
            href="#"
            className="mobile-link"
          >
                
                Blog
          </Link>

          
        </nav>
      </SheetContent>
    </Sheet>
  );
}
