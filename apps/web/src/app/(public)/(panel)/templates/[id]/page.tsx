import Image from "next/image";
import templateCategories from "@/data/categories.json";
import Link from "next/link";
import { getPublicLeadMagnets } from "@smartleadmagnet/services";
import { ImageIcon } from "lucide-react";
import React from "react";
import { marked } from "marked";
import { createSlug } from "@/utils/slug";

export const templateData = [
  {
    id: "1",
    category: "marketing",
    title: "Email Campaign",
    description: "Create an effective email marketing campaign.",
    icon: "https://via.placeholder.com/100", // Dummy icon image URL
  },
  {
    id: "2",
    category: "marketing",
    title: "Social Media Ad",
    description: "Design social media ads for your business.",
    icon: "https://via.placeholder.com/100", // Dummy icon image URL
  },
  {
    id: "3",
    category: "seo",
    title: "SEO Audit",
    description: "Audit your website's SEO performance.",
    icon: "https://via.placeholder.com/100", // Dummy icon image URL
  },
  {
    id: "4",
    category: "design",
    title: "Landing Page Design",
    description: "Design a creative and engaging landing page.",
    icon: "https://via.placeholder.com/100", // Dummy icon image URL
  },
  {
    id: "5",
    category: "development",
    title: "Web Development",
    description: "Develop a responsive website.",
    icon: "https://via.placeholder.com/100", // Dummy icon image URL
  },
  // Add more templates for other categories as needed...
];
export default async function Page({ params }: { params: { id: string } }) {
  const { id } = params;
  const leads = await getPublicLeadMagnets();
  const filteredTemplates = id === "all" ? templateData : templateData.filter((template) => template.category === id);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-center text-4xl font-bold">Templates</h1>

      {/* Top Menu - Categories */}
      <div className="mb-8 flex justify-center">
        <nav className="flex flex-wrap overflow-auto">
          {templateCategories.map((category) => (
            <Link
              key={category.id}
              href={`/templates/${category.id}`}
              className={`no-wrap mb-3 ml-5 rounded-lg px-4 py-2 font-semibold hover:bg-gray-900 hover:text-white
              ${id === category.id ? "bg-gray-900 text-white" : "bg-gray-200"}`}
            >
              {category.name}
            </Link>
          ))}
        </nav>
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
