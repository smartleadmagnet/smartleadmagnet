import Link from 'next/link';

import {
  Home,
  LineChart,
  PanelLeft,
  Settings,
  Users2
} from 'lucide-react';

import { Sheet, SheetContent, SheetTrigger } from '@smartleadmagnet/ui/components/ui/sheet';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '@smartleadmagnet/ui/components/ui/tooltip';
import { NavItem } from './nav-item';
import { getSessionUser } from '@/services/user';
import { redirect } from 'next/navigation';
import { Button } from "@smartleadmagnet/ui/components/ui/button";

export default async function DashboardLayout({
  children
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
      <DesktopNav/>
      <div className="flex flex-col sm:gap-4 sm:pl-14">
        <header
          className="sticky top-0 z-30 flex items-center gap-4 sm:py-2 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:px-6 bg-gray-900 h-36 ">
          <MobileNav/>
          <div className="flex-1"/>
          {/*<User/>*/}
        </header>
        <main className="grid flex-1 items-start gap-2 p-4 sm:px-6 sm:py-0 md:gap-4 bg-muted/40">
          {children}
        </main>
      </div>
    </main>
  );
}

function DesktopNav() {
  return (
    <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
      <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
        <NavItem href="/" label="Dashboard">
          <Home className="h-5 w-5"/>
        </NavItem>
        <NavItem href="/customers" label="Customers">
          <Users2 className="h-5 w-5"/>
        </NavItem>
      </nav>
      <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              href="#"
              className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
            >
              <Settings className="h-5 w-5" />
              <span className="sr-only">Settings</span>
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right">Settings</TooltipContent>
        </Tooltip>
      </nav>
    </aside>
  );
}

function MobileNav() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="icon" variant="outline" className="sm:hidden">
          <PanelLeft className="h-5 w-5" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="sm:max-w-xs">
        <nav className="grid gap-6 text-lg font-medium">
          <Link
            href="#"
            className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
          >
            <Home className="h-5 w-5" />
            Dashboard
          </Link>
          <Link
            href="#"
            className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
          >
            <Users2 className="h-5 w-5" />
            Customers
          </Link>
          <Link
            href="#"
            className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
          >
            <LineChart className="h-5 w-5" />
            Settings
          </Link>
        </nav>
      </SheetContent>
    </Sheet>
  );
}

