import Link from "next/link";
import Image from "next/image";
import Icon from "@smartleadmagnet/ui/components/icon"
import { ChevronDown, PanelLeft, } from "lucide-react";
import { templateCategories } from "@smartleadmagnet/ui/lib/constants";

import { Sheet, SheetContent, SheetTrigger, } from "@smartleadmagnet/ui/components/ui/sheet";
import { Button } from "@smartleadmagnet/ui/components/ui/button";
import { User } from "@/components/User";

;

const CategoryGrid = () => {
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

export default async function WebisteLayout({
                                              children,
                                            }: {
  children: React.ReactNode;
}) {


  return (
    <main className="flex min-h-screen w-full flex-col bg-muted/40">
      <div className="flex flex-col sm:gap-4 ">
        <header
          className="sticky top-0 z-30 flex  items-center gap-4 sm:py-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:px-6 bg-gray-900 h-36 ">
          <MobileNav/>
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
          <DesktopNav/>
          <div className="flex-1 flex justify-end items-end">
            <User/>
          </div>
        </header>
        <main className="flex flex-col">{children}</main>
        <Footer/>
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
            Templates <ChevronDown className="h-4 w-4 ml-1 pt-1"/>
          </Link>
          <div className="mega-menu">
            <CategoryGrid/>
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
        <Button size="icon" variant="outline" className="sm:hidden">
          <PanelLeft className="h-5 w-5"/>
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
          <div className="flex gap-2">
            <Link href="/login"
                  className='bg-cyan-500 text-white font-bold py-3 px-6 rounded-lg  hover:bg-cyan-600 sm:py-4 sm:px-10 '>
              Login
            </Link>
            <Link href="/login"
                  className='border-2 border-cyan-500 text-cyan-500 font-bold py-3 px-6 rounded-lg  hover:bg-cyan-500 hover:text-white sm:py-4 sm:px-8'>
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
    <footer className="bg-gray-900 text-white py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center mb-6">
          {/* Logo Section */}
          <Image
            src="/images/logo/logo.png" // Adjust the logo path as needed
            alt="Logo"
            width={300} // Adjust width as necessary
            height={75} // Adjust height as necessary
            className="mb-4"
          />
          <p className="text-center text-xl mb-2">
            Skyrocket Your Conversions
          </p>
        </div>

        {/* Categories Section */}
        <div className="mb-6">
          <h3 className="text-xl font-bold mb-2">Categories</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {templateCategories.map((category) => (
              <Link key={category.id} href={`/templates/${category.id}`} className="hover:text-gray-500">
                {category.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Important Links Section */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2">Important Links</h3>
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
          <h3 className="text-xl font-semibold mb-2">Follow Us</h3>
          <div className="flex space-x-4">
            <Link href="https://facebook.com" target="_blank" className="hover:text-gray-500">
              <Icon name="facebook"/>
            </Link>
            <Link href="https://twitter.com" target="_blank" className="hover:text-gray-500">
              <Icon name="twitter"/>
            </Link>
            <Link href="https://linkedin.com" target="_blank" className="hover:text-gray-500">
              <Icon name="linkedin"/>
            </Link>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="text-center">
          &copy; {new Date().getFullYear()} Smart Lead Magnet. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
