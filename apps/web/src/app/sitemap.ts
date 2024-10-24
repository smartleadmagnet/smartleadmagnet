import { MetadataRoute } from "next";
import { getAllPages } from "@/lib/mdx";
import blog from "@/data/posts.json"; // https://silver-caribou-278976.hostingersite.com/post-sitemap.xml
import postsTags from "@/data/postsTags.json"; // https://silver-caribou-278976.hostingersite.com/post_tag-sitemap.xml
import { getAllPublicLeads } from "@smartleadmagnet/services";
import { createSlug } from "@/utils/slug";

import dotenv from "dotenv";

dotenv.config(); // Load environment variables from .env file

const otherPages = ["user-data-deletion", "privacy-policy", "terms-and-conditions", "gdpr-commitment"];

const integrationsDirectoryPath = "integrations";

export const dynamic = "force-dynamic";

export const maxDuration = 120;

export default async function sitemap() {
  const leads = await getAllPublicLeads();

  const url = process.env.NEXT_PUBLIC_SITE_URL!;
  const posts = getAllPages<any>(integrationsDirectoryPath);
  const sites: MetadataRoute.Sitemap = [
    {
      url: url,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
  ];

  posts.forEach((post) => {
    sites.push({
      url: `${url}/${integrationsDirectoryPath}/${post.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.5,
    });
  });

  otherPages?.forEach((page) => {
    sites.push({
      url: `${url}/${page}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.5,
    });
  });

  const templates = leads?.map((lead) => {
    return {
      url: `${url}/templates/view/${createSlug(lead.name)}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0,
    };
  });

  return [...sites, ...blog, ...postsTags, ...templates];
}
