export const dynamic = "force-dynamic";
export const revalidate = 0;

import { getAllPublicLeads } from "@smartleadmagnet/services";
import { createSlug } from "@/utils/slug";

export const maxDuration = 120;

function getSitemap(url: string) {
  return `<url><loc>${url}</loc><lastmod>${new Date().toISOString()}</lastmod></url>`;
}

export async function GET() {
  const leads = await getAllPublicLeads();

  const toolSitemap = leads.reduce(
    (acc, lead) => acc + getSitemap(`${process.env.NEXT_PUBLIC_SITE_URL!}/templates/view/${createSlug(lead.name)}`),
    ""
  );

  const xml = /* XML */ `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${toolSitemap}
    </urlset>
  `;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
