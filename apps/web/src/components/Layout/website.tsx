import Link from "next/link";
import Image from "next/image";
import templateCategories from "@/data/categories.json";
import Icon from "@smartleadmagnet/ui/components/icon";
import { ChevronDown, PanelLeft } from "lucide-react";

import { Sheet, SheetContent, SheetTrigger } from "@smartleadmagnet/ui/components/ui/sheet";
import { Button } from "@smartleadmagnet/ui/components/ui/button";
import { User } from "@/components/User";

const CategoryGrid = () => {
  return (
    <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {templateCategories.map((category) => (
          <Link key={category.id} className="cat-item" href={`/templates/${category.id}`}>{category.name}</Link>
      ))}
    </div>
  );
};

export default async function WebsiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <main className="bg-muted/40 main-content flex w-full flex-col">
        <div className="flex flex-col sm:gap-4 ">
          <header className="bg-background sticky top-0 z-30  flex h-36 items-center gap-4 border-b bg-gray-900 px-4 sm:static sm:h-auto sm:border-0 sm:px-6 sm:py-4 ">
            <MobileNav />
            <div className="flex-1">
              <Link href="/">
                <Image src="/images/logo/logo.png" alt="Logo" width={200} height={0} />
              </Link>
            </div>
            <DesktopNav />
            <div className="flex flex-1 items-end justify-end">
              <User />
            </div>
          </header>
          <main className="flex flex-col">{children}</main>
        </div>
      </main>
      <Footer />
    </>
  );
}

function DesktopNav() {
  return (
    <div className="hidden flex-1 md:block">
      <ul className="flex items-center justify-center space-x-5 text-center text-white">
        <li className="group">
          <Link href="/templates" className="flex items-center hover:text-gray-500">
            Templates <ChevronDown className="ml-1 h-4 w-4 pt-1" />
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
    <Sheet>
      <SheetTrigger asChild>
        <Button size="icon" variant="outline" className="md:hidden">
          <PanelLeft className="h-5 w-5" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="mobile-menu bg-gray-900 sm:max-w-xs">
        <nav className="grid gap-6 text-lg font-medium">
          <div>
            <Link href="#" className="mobile-link">
              Templates
            </Link>
            <ul className="ml-4 mt-2 space-y-2">
              {templateCategories.map((category) => (
                <li key={category.id}>
                  <Link href={`/templates/${category.id}`} className="mobile-link text-md block">
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <Link href="#" className="mobile-link">
            Pricing
          </Link>
          <Link href="#" className="mobile-link">
            Blog
          </Link>
          <div className="flex gap-2">
            <Link
              href="/login"
              className="rounded-lg bg-cyan-500 px-6 py-3 font-bold text-white  hover:bg-cyan-600 sm:px-10 sm:py-4 "
            >
              Login
            </Link>
            <Link
              href="/login"
              className="rounded-lg border-2 border-cyan-500 px-6 py-3 font-bold text-cyan-500  hover:bg-cyan-500 hover:text-white sm:px-8 sm:py-4"
            >
              Sign Up
            </Link>
          </div>
        </nav>
      </SheetContent>
    </Sheet>
  );
}

function Footer() {
  return (
    <footer className="bg-gray-900 py-10 text-white">
      <div className="container mx-auto px-4">
        {/* First Row */}
        <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-3">
          {/* Column 1: Logo, Tagline, Social Media */}
          <div className="flex flex-col items-center md:items-start">
            {/* Logo Section */}
            <Image
              src="/images/logo/logo.png" // Adjust the logo path as needed
              alt="Logo"
              width={300} // Adjust width as necessary
              height={75} // Adjust height as necessary
              className="mb-4 ml-[-20px]"
            />
            <p className="mb-4 text-center text-xl md:text-left">Skyrocket Your Conversions</p>

            {/* Social Media Links */}
            <div className="flex space-x-4">
              <Link href="https://facebook.com" target="_blank" className="hover:text-gray-500">
                <Icon name="facebook" />
              </Link>
              <Link href="https://twitter.com" target="_blank" className="hover:text-gray-500">
                <Icon name="twitter" />
              </Link>
              <Link href="https://linkedin.com" target="_blank" className="hover:text-gray-500">
                <Icon name="linkedin" />
              </Link>
            </div>
          </div>

          {/* Column 2: Categories (in 2 rows, 2 columns per row) */}
          <div>
            <h3 className="mb-2 text-xl font-bold">Categories</h3>
            <div className="grid grid-cols-2 gap-4">
              {templateCategories.map((category) => (
                <Link key={category.id} href={`/templates/${category.id}`} className="hover:text-gray-500">
                  {category.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Column 3: Important Links */}
          <div>
            <h3 className="mb-2 text-xl font-semibold">Useful Links</h3>
            <div className="flex flex-col space-y-2">
              <Link href="/privacy-policy" className="hover:text-gray-500">
                Privacy Policy
              </Link>
              <Link href="/terms-and-conditions" className="hover:text-gray-500">
                Terms of Service
              </Link>
              <Link href="/gdpr-commitment" className="hover:text-gray-500">
                GDPR Commitment
              </Link>
              <Link href="/user-data-deletion" className="hover:text-gray-500">
                User Data Deletion
              </Link>
              <Link href="https://smartleadmagnet.featurebase.app/" target="_blank" className="hover:text-gray-500">
                Request a Feature
              </Link>
              <Link
                href="https://smartleadmagnet.featurebase.app/roadmap"
                target="_blank"
                className="hover:text-gray-500"
              >
                Public Roadmap
              </Link>
              <Link href="/integrations" className="hover:text-gray-500">
                Integrations
              </Link>
            </div>
          </div>
        </div>

        {/* Second Row */}
        <div className="border-t border-gray-800 pt-10 text-center">
          &copy; {new Date().getFullYear()} Smart Lead Magnet. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
