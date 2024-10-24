export const revalidate = 3600;
export async function GET() {
  const xml = /* XML */ `<?xml version="1.0" encoding="UTF-8"?>
    <sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <sitemap><loc>${process.env.NEXT_PUBLIC_SITE_URL!}/sitemap/site/sitemap.xml</loc></sitemap>
      <sitemap><loc>${process.env.NEXT_PUBLIC_SITE_URL!}/sitemap/templates.xml</loc></sitemap>
    </sitemapindex>
  `;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
