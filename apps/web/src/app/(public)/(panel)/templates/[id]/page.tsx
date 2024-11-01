import templateCategories from "@/data/categories.json";
import Link from "next/link";
import { getPublicLeadMagnets } from "@smartleadmagnet/services";
import React from "react";
import SearchBox from "@/components/SearchBox";
import { SearchParamType } from "@/lib/types";
import LeadMagnetCard from "@/components/LeadMagnetCard";
import { getSessionUser } from "@/services/user";
import getSeo from "@/lib/seo";
import { BreadcrumbJsonLd, WebPageJsonLd } from "next-seo";

export async function generateStaticParams() {
  return templateCategories.map((category) => ({ id: category.id }));
}

export async function generateMetadata({ params }: { params: { id: string } }) {
  const { id } = params;
  const category = templateCategories.find((c) => c.id === id);
  if (!category) {
    return getSeo(
      {
        title: "Lead Magnet Templates - SmartLeadMagnet",
        description: "Transform your website in Lead Generation Machine with our Lead Magnet Templates.",
      },
      "templates"
    );
  }
  return getSeo(
    {
      title: `${category?.name} Lead Magnet Templates - SmartLeadMagnet`,
      description: `Transform your website in Lead Generation Machine with our ${category?.name} Lead Magnet Templates.`,
    },
    `templates/${category.id}`
  );
}

export const dynamic = "force-static";

export default async function Page({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams?: SearchParamType;
}) {
  const { id } = params;
  const query = decodeURIComponent(searchParams?.query || "");
  const leads = await getPublicLeadMagnets({ category: id, term: query });
  const user = await getSessionUser();
  const category = templateCategories.find((c) => c.id === id);
  return (
    <>
      <WebPageJsonLd
        useAppDir
        id={`https://smartleadmagnet.com/templates/${id}`}
        url={`https://smartleadmagnet.com/templates/${id}`}
        title={`${category?.name} Lead Magnet Templates - SmartLeadMagnet`}
        description={`Transform your website in Lead Generation Machine with our ${category?.name} Lead Magnet Templates.`}
        images={[
          "https://smartleadmagnet.com/og-image.png",
          "https://smartleadmagnet.com/images/logo/logo.png",
          "https://smartleadmagnet.com/lead-magnet-01.png",
          "https://smartleadmagnet.com/lead-magnet-02.png",
        ]}
        inLanguage="en-US"
      />
      <BreadcrumbJsonLd
        useAppDir
        itemListElements={[
          {
            position: 1,
            name: "Home",
            item: "https://smartleadmagnet.com/",
          },
          {
            position: 2,
            name: "Templates",
            item: "https://smartleadmagnet.com/templates",
          },
          {
            position: 3,
            name: category?.name,
            item: `https://smartleadmagnet.com/templates/${id}`,
          },
        ]}
      />
      <div className="container mx-auto px-4 py-8">
        <h1 className="mb-8 text-center text-5xl font-bold leading-[1.5]">
          Transform your website in <span className="text-cyan-500">Lead Generation Machine</span>
          <br />
          with our <span className="text-cyan-500">Lead Magnets</span> Templates.
        </h1>

        {/* Top Menu - Categories */}
        <div className="space-between mb-2 flex items-start">
          <nav className="flex flex-wrap overflow-auto">
            {templateCategories.map((category) => (
              <Link
                key={category.id}
                href={`/templates/${category.id}`}
                className={`no-wrap mb-3 mr-5 rounded-lg bg-cyan-500 px-4 py-2 text-sm font-semibold hover:bg-cyan-500 hover:text-white
              ${id === category.id ? "bg-cyan-500 text-white" : "bg-gray-200"}`}
              >
                {category.name}
              </Link>
            ))}
          </nav>
          {/*<SearchBox />*/}
        </div>
        <div className="mb-10 flex justify-end">
          <Link
            href="/suggest-magnet"
            className="btn btn-primary relative flex items-center rounded px-4 py-2 hover:bg-cyan-600"
          >
            Suggest me a Magnet
          </Link>
        </div>

        {/* Template Items Section */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {leads.length ? (
            leads.map((leadMagnet) => <LeadMagnetCard key={leadMagnet.id} leadMagnet={leadMagnet} user={user} />)
          ) : (
            <p>No templates available for this category.</p>
          )}
        </div>
      </div>
    </>
  );
}
