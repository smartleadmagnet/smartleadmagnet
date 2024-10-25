import Image from "next/image";
import templateCategories from "@/data/categories.json";
import Link from "next/link";
import { getPublicLeadMagnets } from "@smartleadmagnet/services";
import React from "react";
import SearchBox from "@/components/SearchBox";
import { SearchParamType } from "@/lib/types";
import LeadMagnetCard from "@/components/LeadMagnetCard";

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

  return (
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
        <SearchBox />
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
          leads.map((leadMagnet) => (
            <LeadMagnetCard key={leadMagnet.id} leadMagnet={leadMagnet} />
          ))
        ) : (
          <p>No templates available for this category.</p>
        )}
      </div>
    </div>
  );
}
