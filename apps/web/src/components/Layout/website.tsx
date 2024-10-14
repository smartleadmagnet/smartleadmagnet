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
      {templateCategories.map((category, index) => (
        <div key={category.id} className="cat-item">
          <Link href={`/templates/${category.id}`}>{category.name}</Link>
        </div>
      ))}
    </div>
  );
};



export default async function WebisteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
    <main className="bg-muted/40 flex main-content w-full flex-col">
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
    <footer className="bg-gray-900 py-6 text-white">
      <div className="container mx-auto px-4">
        <div className="mb-6 flex flex-col items-center">
          {/* Logo Section */}
          <Image
            src="/images/logo/logo.png" // Adjust the logo path as needed
            alt="Logo"
            width={300} // Adjust width as necessary
            height={75} // Adjust height as necessary
            className="mb-4"
          />
          <p className="mb-2 text-center text-xl">Skyrocket Your Conversions</p>
        </div>

        {/* Categories Section */}
        <div className="mb-6">
          <h3 className="mb-2 text-xl font-bold">Categories</h3>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {templateCategories.map((category) => (
              <Link key={category.id} href={`/templates/${category.id}`} className="hover:text-gray-500">
                {category.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Important Links Section */}
        <div className="mb-6">
          <h3 className="mb-2 text-xl font-semibold">Important Links</h3>
          <div className="flex space-x-4">
            <Link href="/privacy" className="hover:text-gray-500">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-gray-500">
              Terms of Service
            </Link>
            <Link href="/contact" className="hover:text-gray-500">
              Contact Us
            </Link>
          </div>
        </div>

        {/* Social Media Links */}
        <div className="mb-6">
          <h3 className="mb-2 text-xl font-semibold">Follow Us</h3>
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

        {/* Copyright Section */}
        <div className="text-center">&copy; {new Date().getFullYear()} Smart Lead Magnet. All rights reserved.</div>
      </div>
    </footer>
  );
}
