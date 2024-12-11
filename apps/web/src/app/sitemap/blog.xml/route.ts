export const dynamic = "force-dynamic";
export const revalidate = 0;

export const maxDuration = 120;

const blogUrls = [
  { url: "https://smartleadmagnet.com/blog/top-ai-websites-discover-the-best-tools-online/", lastmod: "2024-12-10T20:26:11+00:00" },
  { url: "https://smartleadmagnet.com/blog/ai-to-create-app-build-your-own-application/", lastmod: "2024-12-10T20:26:11+00:00" },
  { url: "https://smartleadmagnet.com/blog/no-code-ai-tools-simplify-your-workflow-today/", lastmod: "2024-12-10T20:26:11+00:00" },
  { url: "https://smartleadmagnet.com/blog/create-your-app-with-ai-easy-innovative/", lastmod: "2024-12-10T20:26:11+00:00" },
  { url: "https://smartleadmagnet.com/blog/ai-mobile-app-development-smart-solutions/", lastmod: "2024-12-10T20:26:11+00:00" },
  { url: "https://smartleadmagnet.com/blog/top-free-ai-tools-for-marketing-success/", lastmod: "2024-12-10T20:26:11+00:00" },
  { url: "https://smartleadmagnet.com/blog/ai-powered-app-development-the-future-is-here/", lastmod: "2024-12-10T20:26:11+00:00" },
  { url: "https://smartleadmagnet.com/blog/ai-for-content-creation-boost-your-productivity/", lastmod: "2024-12-10T20:26:11+00:00" },
  { url: "https://smartleadmagnet.com/blog/ai-help-simplify-your-life-with-smart-technology/", lastmod: "2024-12-10T20:26:11+00:00" },
  { url: "https://smartleadmagnet.com/blog/best-artificial-intelligence-app-for-smart-solutions/", lastmod: "2024-12-10T20:26:11+00:00" },
  { url: "https://smartleadmagnet.com/blog/discover-the-best-free-ai-platform-for-your-needs/", lastmod: "2024-12-10T20:26:11+00:00" },
  { url: "https://smartleadmagnet.com/blog/ai-content-creation-revolutionize-your-writing/", lastmod: "2024-12-10T20:26:11+00:00" },
  { url: "https://smartleadmagnet.com/blog/ai-software-for-business-boost-your-productivity/", lastmod: "2024-12-10T20:26:11+00:00" },
  { url: "https://smartleadmagnet.com/blog/unlock-exclusive-ai-download-revolutionize-your-future-now/", lastmod: "2024-12-10T20:26:11+00:00" },
  { url: "https://smartleadmagnet.com/blog/top-ai-discover-the-best-artificial-intelligence-tools/", lastmod: "2024-12-10T20:26:11+00:00" },
  { url: "https://smartleadmagnet.com/blog/ai-sites-explore-top-artificial-intelligence-tools/", lastmod: "2024-12-10T20:26:11+00:00" },
  { url: "https://smartleadmagnet.com/blog/top-ai-apps-revolutionize-your-digital-experience/", lastmod: "2024-12-10T20:26:11+00:00" },
  { url: "https://smartleadmagnet.com/blog/top-10-best-ai-sites-for-every-tech-enthusiast/", lastmod: "2024-12-10T20:26:11+00:00" },
  { url: "https://smartleadmagnet.com/blog/discover-the-best-ai-free-app-for-your-needs/", lastmod: "2024-12-10T20:26:11+00:00" },
  { url: "https://smartleadmagnet.com/blog/discover-the-secret-to-building-genius-sites-with-free-ai-websites/", lastmod: "2024-12-10T20:26:11+00:00" },
  { url: "https://smartleadmagnet.com/blog/build-app-with-ai-create-smart-solutions-easily/", lastmod: "2024-12-10T20:26:11+00:00" },
  { url: "https://smartleadmagnet.com/blog/ais-magic-touch-revolutionizing-web-design/", lastmod: "2024-12-10T20:26:11+00:00" },
  { url: "https://smartleadmagnet.com/blog/revolutionary-ai-marketing-ignite-viral-campaigns-now/", lastmod: "2024-12-10T20:26:11+00:00" },
  { url: "https://smartleadmagnet.com/blog/top-secret-ai-apps-exposed-get-instant-access-to-the-best-free-tools-now/", lastmod: "2024-12-10T20:26:11+00:00" },
  { url: "https://smartleadmagnet.com/blog/revolutionize-your-mind-answer-ais-genius-tech-awaits/", lastmod: "2024-12-10T20:26:11+00:00" },
  { url: "https://smartleadmagnet.com/blog/transform-your-workflow-top-ai-tools-for-unparalleled-efficiency/", lastmod: "2024-12-10T20:26:11+00:00" },
  { url: "https://smartleadmagnet.com/blog/transform-your-workflow-top-free-ai-tools-for-unparalleled-productivity/", lastmod: "2024-12-10T20:26:11+00:00" },
  { url: "https://smartleadmagnet.com/blog/revolutionize-your-workflow-free-ai-software-for-unparalleled-efficiency/", lastmod: "2024-12-10T20:26:11+00:00" },
  { url: "https://smartleadmagnet.com/blog/revolutionize-with-ai-marketing-tools-skyrocket-your-keywords-strategy-now/", lastmod: "2024-12-10T20:26:11+00:00" },
  { url: "https://smartleadmagnet.com/blog/top-marketing-ai-tools-for-smarter-campaigns/", lastmod: "2024-12-10T20:26:11+00:00" },
  { url: "https://smartleadmagnet.com/blog/ai-applications-transforming-our-digital-world/", lastmod: "2024-12-10T20:26:11+00:00" },
  { url: "https://smartleadmagnet.com/blog/ai-create-app-build-your-dream-application/", lastmod: "2024-12-10T20:26:11+00:00" },
  { url: "https://smartleadmagnet.com/blog/discover-top-business-ai-tools-for-success/", lastmod: "2024-12-10T20:26:11+00:00" },
  { url: "https://smartleadmagnet.com/blog/ai-that-creates-apps-revolutionize-development/", lastmod: "2024-12-10T20:26:11+00:00" },
  { url: "https://smartleadmagnet.com/blog/ai-tools-online-boost-your-productivity-today/", lastmod: "2024-12-10T20:26:11+00:00" },
  { url: "https://smartleadmagnet.com/blog/discover-top-free-ai-sites-for-everyday-use/", lastmod: "2024-12-10T20:26:11+00:00" },
  { url: "https://smartleadmagnet.com/blog/exploring-ai-applications-revolutionize-your-world/", lastmod: "2024-12-10T20:26:11+00:00" },
  { url: "https://smartleadmagnet.com/blog/unleash-your-potential-learn-to-use-ai-today/", lastmod: "2024-12-10T20:26:11+00:00" },
  { url: "https://smartleadmagnet.com/blog/free-ai-website-builder-create-smart-sites/", lastmod: "2024-12-10T20:26:11+00:00" },
  { url: "https://smartleadmagnet.com/blog/unlock-your-creative-potential-no-code-ai-for-intelligent-app-development/", lastmod: "2024-12-10T20:26:11+00:00" },
  { url: "https://smartleadmagnet.com/blog/ai-content-creation-tools-boost-your-writing/", lastmod: "2024-12-10T20:26:11+00:00" },
  { url: "https://smartleadmagnet.com/blog/ai-marketing-tools-find-the-best-options/", lastmod: "2024-12-10T20:26:11+00:00" },
  { url: "https://smartleadmagnet.com/blog/create-apps-easily-with-app-making-ai/", lastmod: "2024-12-10T20:26:11+00:00" },
  { url: "https://smartleadmagnet.com/blog/ai-intelligence-app-boost-your-productivity/", lastmod: "2024-12-10T20:26:11+00:00" },
  { url: "https://smartleadmagnet.com/blog/artificial-intelligence-download-get-started-today/", lastmod: "2024-12-10T20:26:11+00:00" },
  { url: "https://smartleadmagnet.com/blog/build-an-ai-app-your-guide-to-creating-smart-software/", lastmod: "2024-12-10T20:26:11+00:00" },
  { url: "https://smartleadmagnet.com/blog/free-ai-tools-for-business-boost-productivity-now/", lastmod: "2024-12-10T20:26:11+00:00" },
  { url: "https://smartleadmagnet.com/blog/ai-marketing-software-boost-your-campaign-success/", lastmod: "2024-12-10T20:26:11+00:00" },
  { url: "https://smartleadmagnet.com/blog/ai-lead-magnet-boost-your-digital-marketing-success/", lastmod: "2024-12-10T20:26:11+00:00" },
  { url: "https://smartleadmagnet.com/blog/ai-tools-for-marketing-boost-your-strategy/", lastmod: "2024-12-10T20:26:11+00:00" },
  { url: "https://smartleadmagnet.com/blog/boost-your-marketing-with-an-ai-powered-app/", lastmod: "2024-12-10T20:26:11+00:00" },
  { url: "https://smartleadmagnet.com/blog/creator-ai-revolutionize-your-content-creation/", lastmod: "2024-12-10T20:26:11+00:00" },
  { url: "https://smartleadmagnet.com/blog/ai-free-tools-discover-top-no-cost-ai-solutions/", lastmod: "2024-12-10T20:26:11+00:00" },
  { url: "https://smartleadmagnet.com/blog/top-ai-apps-for-iphone-boost-your-mobile-experience/", lastmod: "2024-12-10T20:26:11+00:00" },
  { url: "https://smartleadmagnet.com/blog/create-an-ai-app-your-guide-to-building-smart-tech/", lastmod: "2024-12-10T20:26:11+00:00" },
  { url: "https://smartleadmagnet.com/blog/top-free-ai-apps-discover-the-best-options-today/", lastmod: "2024-12-10T20:26:11+00:00" },
  { url: "https://smartleadmagnet.com/blog/build-an-app-with-ai-easy-guide-for-beginners/", lastmod: "2024-12-10T20:26:11+00:00" },
  { url: "https://smartleadmagnet.com/blog/ai-to-create-apps-revolutionize-app-development/", lastmod: "2024-12-10T20:26:11+00:00" }
];

function generateSitemap() {
  const urlEntries = blogUrls.map(({ url, lastmod }) => `
    <url>
      <loc>${url}</loc>
      <lastmod>${lastmod}</lastmod>
      <changefreq>monthly</changefreq>
      <priority>0.2</priority>
    </url>`).join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${urlEntries}
</urlset>`;
}

export async function GET() {
  const sitemap = generateSitemap();
  console.log("Sitemap content:", sitemap.substring(0, 100)); // Log a snippet of the sitemap for debugging

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'text/xml',
      'Cache-Control': 'public, max-age=3600, must-revalidate',
    },
  });
} 