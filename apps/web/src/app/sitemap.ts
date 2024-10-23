import { MetadataRoute } from "next";
import { getAllPages } from "@/lib/mdx";

const otherPages = ["user-data-deletion", "privacy-policy", "terms-and-conditions", "gdpr-commitment"];

const integrationsDirectoryPath = "integrations";

export default function sitemap(): MetadataRoute.Sitemap {
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

  return sites;
}
