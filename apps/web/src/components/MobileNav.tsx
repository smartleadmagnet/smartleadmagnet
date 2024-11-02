"use client"
import { useState } from 'react';
import { Sheet, SheetTrigger, SheetContent } from '@smartleadmagnet/ui/components/ui/sheet';
import { Button } from '@smartleadmagnet/ui/components/ui/button';
import Link from 'next/link';
import { PanelLeft } from 'lucide-react';

interface TemplateCategory {
  id: string;
  name: string;
}

interface MobileNavProps {
  templateCategories: TemplateCategory[];
}

const MobileNav: React.FC<MobileNavProps> = ({ templateCategories }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const closeSheet = () => setIsOpen(false);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button size="icon" variant="outline" className="md:hidden" onClick={() => setIsOpen(true)}>
          <PanelLeft className="h-5 w-5" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="mobile-menu bg-gray-900 sm:max-w-xs">
        <nav className="grid gap-6 text-lg font-medium">
          <div>
            <Link href="/templates/all" className="mobile-link" onClick={closeSheet}>
              Templates
            </Link>
            <ul className="ml-4 mt-2 space-y-2">
              {templateCategories.map((category) => (
                <li key={category.id}>
                  <Link
                    href={`/templates/${category.id}`}
                    className="mobile-link text-md block"
                    onClick={closeSheet}
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <Link href="/pricing" className="mobile-link" onClick={closeSheet}>
            Pricing
          </Link>
          <a href="/blog" className="mobile-link" onClick={closeSheet}>
            Blog
          </a>
          <div className="flex gap-2">
            <Link
              href="/login"
              className="rounded-lg bg-cyan-500 px-6 py-3 font-bold text-white hover:bg-cyan-600 sm:px-10 sm:py-4"
              onClick={closeSheet}
            >
              Login
            </Link>
            <Link
              href="/login"
              className="rounded-lg border-2 border-cyan-500 px-6 py-3 font-bold text-cyan-500 hover:bg-cyan-500 hover:text-white sm:px-8 sm:py-4"
              onClick={closeSheet}
            >
              Sign Up
            </Link>
          </div>
        </nav>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
