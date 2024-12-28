import Link from "next/link";
import Image from "next/image";
import templateCategories from "@/data/categories.json";
// import ProductHuntLaunchSupport from "../ProductHuntLaunchSupport";
import { ChevronDown } from "lucide-react";
import { FaFacebook, FaGithub, FaYoutube, FaHandshake, FaDiscord } from "react-icons/fa";
import MobileNav from "@/components/MobileNav";
import User from "@/components/User";
import ScheduleMeeting from "../ScheduleMeeting";

const CategoryGrid = () => {
  return (
    <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {templateCategories.map((category) => (
        <Link key={category.id} className="cat-item" href={`/templates/${category.id}`}>
          {category.name}
        </Link>
      ))}
    </div>
  );
};

export default async function WebsiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/*<ProductHuntLaunchSupport/>*/}
      <main className="bg-muted/40 main-content flex w-full flex-col">
        <div className="flex flex-col sm:gap-4 ">
          <header className="bg-background sticky top-0 z-30  flex h-36 items-center gap-4 border-b bg-gray-900 px-4 sm:static sm:h-auto sm:border-0 sm:px-6 sm:py-4 ">
            <MobileNav templateCategories={templateCategories} />
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
          <a href="/blog" className="hover:text-gray-500">
            Blog
          </a>
        </li>
      </ul>
    </div>
  );
}

function Footer() {
  return (
    <>
      <ScheduleMeeting />
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
              <p className="mb-4 text-center text-xl md:text-left">Proudly Open Source ❤️ </p>
              <a
                href="https://www.producthunt.com/posts/smart-lead-magnet?embed=true&utm_source=badge-top-post-badge&utm_medium=badge&utm_souce=badge-smart&#0045;lead&#0045;magnet"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="https://api.producthunt.com/widgets/embed-image/v1/top-post-badge.svg?post_id=495729&theme=neutral&period=daily"
                  alt="Smart Lead Magnet - AI Lead Magnets to Easily Boost Website Traffic | Product Hunt"
                  style={{ width: "250px", height: "54px" }}
                  width="250"
                  height="54"
                />
              </a>
              <Link
                href="/affiliates"
                className="text-primary my-3 inline-flex min-w-[250px] items-center rounded-lg bg-white px-6 py-3 text-lg font-semibold transition-all duration-200 hover:bg-gray-100"
              >
                <FaHandshake className="mr-2 text-xl text-[#D2A679]" />
                Be a Partner with us
              </Link>

              <Link
                href="https://discord.gg/HAuYts3vJF"
                target="_blank"
                className="text-primary inline-flex min-w-[250px] items-center rounded-lg bg-white px-6 py-3 text-lg font-semibold transition-all duration-200 hover:bg-gray-100"
              >
                <FaDiscord className="mr-2 text-xl text-[#7289DA]" />
                Join our Community
              </Link>

              {/* Social Media Links */}
              <div className="mt-5 flex space-x-4">
                <Link
                  href="https://www.facebook.com/people/Smartleadmagnet/61567550700439/"
                  target="_blank"
                  className="hover:text-gray-500"
                >
                  <FaFacebook className="h-8 w-8 text-blue-500" />
                </Link>
                <Link
                  href="https://www.youtube.com/channel/UCsYNmeoFcdVw37w_-xd4h3A"
                  target="_blank"
                  className="hover:text-gray-500"
                >
                  <FaYoutube className="h-8 w-8 text-red-500" />
                </Link>
                <Link
                  href="https://github.com/smartleadmagnet/smartleadmagnet"
                  target="_blank"
                  className="hover:text-gray-500"
                >
                  <FaGithub className="h-8 w-8 text-white" />
                </Link>
                <Link href="https://discord.gg/HAuYts3vJF" target="_blank" className="hover:text-gray-500">
                  <FaDiscord className="h-8 w-8 text-[#7289DA]" />
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
                <a href="https://aistage.net" title="AIStage" className="hover:text-gray-500">AIStage</a>
              </div>
            </div>
          </div>

          {/* Second Row */}
          <div className="border-t border-gray-800 pt-10 text-center">
            &copy; {new Date().getFullYear()} Smart Lead Magnet. All rights reserved.
          </div>
        </div>
      </footer>
    </>
  );
}
