import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/"],
        disallow: ["/api/", "/login/*", "/admin/*", "/actions/*", "/my-magnets/*", "/builder/*", "/api/og/*"],
      },
    ],
    sitemap: "https://smartleadmagnet.com/sitemap.xml",
  };
}
