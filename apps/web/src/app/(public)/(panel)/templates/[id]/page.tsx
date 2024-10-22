import Image from "next/image";
import templateCategories from "@/data/categories.json";
import Link from "next/link";
import { getPublicLeadMagnets } from "@smartleadmagnet/services";
import { Input } from "@smartleadmagnet/ui/components/ui/input";
import { Button } from "@smartleadmagnet/ui/components/ui/button";
import { ImageIcon } from "lucide-react";
import { Search } from "lucide-react";
import React from "react";
import { marked } from "marked";
import { createSlug } from "@/utils/slug";

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = params;
  const leads = await getPublicLeadMagnets();
  

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-center text-5xl font-bold leading-[1.5]">
        Transform your website in <span className="text-cyan-500">Lead Generation Machine</span><br/>
        with our <span className="text-cyan-500">Lead Magnets</span> Templates.
      </h1>


      {/* Top Menu - Categories */}
      <div className="mb-2 flex space-between items-start">
        <nav className="flex flex-wrap overflow-auto">
          {templateCategories.map((category) => (
            <Link
              key={category.id}
              href={`/templates/${category.id}`}
              className={`no-wrap text-sm bg-cyan-500 mb-3 mr-5 rounded-lg px-4 py-2 font-semibold hover:bg-cyan-500 hover:text-white
              ${id === category.id ? "bg-cyan-500 text-white" : "bg-gray-200"}`}
            >
              {category.name}
            </Link>
          ))}
        </nav>
        {/* Search Input */}
        <div className="flex w-full max-w-sm items-center space-x-2">
      <Input type="text" className="py-5" placeholder="Search..." />
      <Button type="submit" className="bg-cyan-500 hover:bg-cyan-600"><Search className="w-5 h-5"/></Button>
    </div>
    
      </div>
      <div className="flex justify-end mb-10">
      <Link
        href="/suggest-a-magnet"
        className="btn btn-primary relative flex items-center px-4 py-2 hover:bg-cyan-600 rounded"
      >
        Suggest me a Magnet
      </Link>
      </div>
      

      {/* Template Items Section */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {leads.length ? (
          leads.map((leadMagnet) => {
            const slug = createSlug(leadMagnet.name);
            return (
              <div key={leadMagnet.id} className="rounded-lg border border-gray-200 bg-white p-6 shadow-md">
                <div className="mb-4 flex items-center space-x-4">
                  {/* Use Next.js Image component */}
                  {leadMagnet.image ? (
                    <Image
                      className="h-[60px] w-[60px] rounded-full object-cover object-center"
                      src={leadMagnet.image}
                      alt={leadMagnet.name}
                      width={60}
                      height={60}
                    />
                  ) : (
                    <div className="app_icon">
                      <ImageIcon className="h-[40px] w-[40px] rounded-full" />
                    </div>
                  )}

                  <h2 className="text-2xl font-semibold">{leadMagnet.name}</h2>
                </div>
                {leadMagnet.description && (
                  <>
                    <p
                      className="mb-4 text-gray-600"
                      dangerouslySetInnerHTML={{ __html: marked(leadMagnet.description.slice(0, 200)) }}
                    />
                  </>
                )}
                <div className="flex space-x-2">
                  <Link
                    href={`/templates/view/${slug}`}
                    className="rounded bg-cyan-500 px-4 py-2 text-white hover:bg-cyan-600"
                  >
                    Use This
                  </Link>
                  <Link
                    href={`/templates/use/${slug}`}
                    className="rounded border border-cyan-500  px-4 py-2  text-cyan-500 hover:bg-cyan-600 hover:text-white"
                  >
                    Make it yours
                  </Link>
                </div>
              </div>
            );
          })
        ) : (
          <p>No templates available for this category.</p>
        )}
      </div>
    </div>
  );
}
