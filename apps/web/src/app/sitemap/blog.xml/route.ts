export const dynamic = "force-dynamic";
export const revalidate = 0;

export const maxDuration = 120;

const blogUrls = [
  { url: "https://smartleadmagnet.com/blog/top-ai-websites-discover-the-best-tools-online/", lastmod: "2024-09-28T20:25:56+00:00" },
  { url: "https://smartleadmagnet.com/blog/ai-to-create-app-build-your-own-application/", lastmod: "2024-09-28T20:26:11+00:00" },
  { url: "https://smartleadmagnet.com/blog/no-code-ai-tools-simplify-your-workflow-today/", lastmod: "2024-10-06T07:24:04+00:00" },
  { url: "https://smartleadmagnet.com/blog/create-your-app-with-ai-easy-innovative/", lastmod: "2024-09-28T20:26:37+00:00" },
  { url: "https://smartleadmagnet.com/blog/ai-mobile-app-development-smart-solutions/", lastmod: "2024-09-30T11:18:38+00:00" },
  { url: "https://smartleadmagnet.com/blog/top-free-ai-tools-for-marketing-success/", lastmod: "2024-10-01T14:14:31+00:00" },
  { url: "https://smartleadmagnet.com/blog/ai-powered-app-development-the-future-is-here/", lastmod: "2024-10-01T14:18:03+00:00" },
  { url: "https://smartleadmagnet.com/blog/ai-for-content-creation-boost-your-productivity/", lastmod: "2024-10-02T11:14:55+00:00" },
  { url: "https://smartleadmagnet.com/blog/ai-help-simplify-your-life-with-smart-technology/", lastmod: "2024-10-04T14:03:24+00:00" },
  { url: "https://smartleadmagnet.com/blog/best-artificial-intelligence-app-for-smart-solutions/", lastmod: "2024-10-06T07:18:53+00:00" },
  { url: "https://smartleadmagnet.com/blog/discover-the-best-free-ai-platform-for-your-needs/", lastmod: "2024-10-13T00:30:34+00:00" },
  { url: "https://smartleadmagnet.com/blog/ai-content-creation-revolutionize-your-writing/", lastmod: "2024-10-07T12:49:26+00:00" },
  { url: "https://smartleadmagnet.com/blog/ai-software-for-business-boost-your-productivity/", lastmod: "2024-10-09T15:23:48+00:00" },
  { url: "https://smartleadmagnet.com/blog/unlock-exclusive-ai-download-revolutionize-your-future-now/", lastmod: "2024-10-09T15:29:44+00:00" },
  { url: "https://smartleadmagnet.com/blog/top-ai-discover-the-best-artificial-intelligence-tools/", lastmod: "2024-10-09T15:32:17+00:00" },
  { url: "https://smartleadmagnet.com/blog/ai-sites-explore-top-artificial-intelligence-tools/", lastmod: "2024-10-10T13:13:06+00:00" },
  { url: "https://smartleadmagnet.com/blog/top-ai-apps-revolutionize-your-digital-experience/", lastmod: "2024-10-11T12:32:14+00:00" },
  { url: "https://smartleadmagnet.com/blog/top-10-best-ai-sites-for-every-tech-enthusiast/", lastmod: "2024-10-12T22:00:08+00:00" },
  { url: "https://smartleadmagnet.com/blog/discover-the-best-ai-free-app-for-your-needs/", lastmod: "2024-10-12T22:00:45+00:00" },
  { url: "https://smartleadmagnet.com/blog/discover-the-secret-to-building-genius-sites-with-free-ai-websites/", lastmod: "2024-10-14T10:57:07+00:00" },
  { url: "https://smartleadmagnet.com/blog/build-app-with-ai-create-smart-solutions-easily/", lastmod: "2024-10-15T11:26:03+00:00" },
  { url: "https://smartleadmagnet.com/blog/ais-magic-touch-revolutionizing-web-design/", lastmod: "2024-10-17T13:33:27+00:00" },
  { url: "https://smartleadmagnet.com/blog/revolutionary-ai-marketing-ignite-viral-campaigns-now/", lastmod: "2024-10-18T12:11:25+00:00" },
  { url: "https://smartleadmagnet.com/blog/top-secret-ai-apps-exposed-get-instant-access-to-the-best-free-tools-now/", lastmod: "2024-10-18T12:19:59+00:00" },
  { url: "https://smartleadmagnet.com/blog/revolutionize-your-mind-answer-ais-genius-tech-awaits/", lastmod: "2024-10-19T13:33:21+00:00" },
  { url: "https://smartleadmagnet.com/blog/transform-your-workflow-top-ai-tools-for-unparalleled-efficiency/", lastmod: "2024-11-05T08:42:06+00:00" },
  { url: "https://smartleadmagnet.com/blog/transform-your-workflow-top-free-ai-tools-for-unparalleled-productivity/", lastmod: "2024-11-05T08:40:08+00:00" },
  { url: "https://smartleadmagnet.com/blog/revolutionize-your-workflow-free-ai-software-for-unparalleled-efficiency/", lastmod: "2024-11-05T08:35:22+00:00" },
  { url: "https://smartleadmagnet.com/blog/revolutionize-with-ai-marketing-tools-skyrocket-your-keywords-strategy-now/", lastmod: "2024-11-05T08:34:12+00:00" },
  { url: "https://smartleadmagnet.com/blog/top-marketing-ai-tools-for-smarter-campaigns/", lastmod: "2024-11-05T07:39:14+00:00" },
  { url: "https://smartleadmagnet.com/blog/ai-applications-transforming-our-digital-world/", lastmod: "2024-11-07T04:51:04+00:00" },
  { url: "https://smartleadmagnet.com/blog/ai-create-app-build-your-dream-application/", lastmod: "2024-11-07T04:58:07+00:00" },
  { url: "https://smartleadmagnet.com/blog/discover-top-business-ai-tools-for-success/", lastmod: "2024-11-07T05:04:27+00:00" },
  { url: "https://smartleadmagnet.com/blog/ai-that-creates-apps-revolutionize-development/", lastmod: "2024-11-07T05:07:53+00:00" },
  { url: "https://smartleadmagnet.com/blog/ai-tools-online-boost-your-productivity-today/", lastmod: "2024-11-07T05:09:37+00:00" },
  { url: "https://smartleadmagnet.com/blog/discover-top-free-ai-sites-for-everyday-use/", lastmod: "2024-11-07T05:14:58+00:00" },
  { url: "https://smartleadmagnet.com/blog/exploring-ai-applications-revolutionize-your-world/", lastmod: "2024-11-07T05:49:15+00:00" },
  { url: "https://smartleadmagnet.com/blog/unleash-your-potential-learn-to-use-ai-today/", lastmod: "2024-11-07T05:51:26+00:00" },
  { url: "https://smartleadmagnet.com/blog/free-ai-website-builder-create-smart-sites/", lastmod: "2024-11-11T07:45:09+00:00" },
  { url: "https://smartleadmagnet.com/blog/unlock-your-creative-potential-no-code-ai-for-intelligent-app-development/", lastmod: "2024-11-11T07:51:56+00:00" },
  { url: "https://smartleadmagnet.com/blog/ai-content-creation-tools-boost-your-writing/", lastmod: "2024-11-12T04:19:18+00:00" },
  { url: "https://smartleadmagnet.com/blog/ai-marketing-tools-find-the-best-options/", lastmod: "2024-11-12T04:20:18+00:00" },
  { url: "https://smartleadmagnet.com/blog/create-apps-easily-with-app-making-ai/", lastmod: "2024-11-13T04:53:20+00:00" },
  { url: "https://smartleadmagnet.com/blog/ai-intelligence-app-boost-your-productivity/", lastmod: "2024-11-14T04:56:57+00:00" },
  { url: "https://smartleadmagnet.com/blog/artificial-intelligence-download-get-started-today/", lastmod: "2024-11-16T07:10:49+00:00" },
  { url: "https://smartleadmagnet.com/blog/build-an-ai-app-your-guide-to-creating-smart-software/", lastmod: "2024-11-18T08:39:25+00:00" },
  { url: "https://smartleadmagnet.com/blog/free-ai-tools-for-business-boost-productivity-now/", lastmod: "2024-11-19T09:25:30+00:00" },
  { url: "https://smartleadmagnet.com/blog/ai-marketing-software-boost-your-campaign-success/", lastmod: "2024-11-20T11:00:03+00:00" },
  { url: "https://smartleadmagnet.com/blog/ai-lead-magnet-boost-your-digital-marketing-success/", lastmod: "2024-11-21T08:25:16+00:00" },
  { url: "https://smartleadmagnet.com/blog/ai-tools-for-marketing-boost-your-strategy/", lastmod: "2024-11-22T06:51:06+00:00" },
  { url: "https://smartleadmagnet.com/blog/boost-your-marketing-with-an-ai-powered-app/", lastmod: "2024-11-23T04:44:02+00:00" },
  { url: "https://smartleadmagnet.com/blog/creator-ai-revolutionize-your-content-creation/", lastmod: "2024-11-25T06:35:35+00:00" },
  { url: "https://smartleadmagnet.com/blog/ai-free-tools-discover-top-no-cost-ai-solutions/", lastmod: "2024-11-26T07:51:30+00:00" },
  { url: "https://smartleadmagnet.com/blog/top-ai-apps-for-iphone-boost-your-mobile-experience/", lastmod: "2024-11-27T06:53:56+00:00" },
  { url: "https://smartleadmagnet.com/blog/create-an-ai-app-your-guide-to-building-smart-tech/", lastmod: "2024-11-28T04:48:17+00:00" },
  { url: "https://smartleadmagnet.com/blog/top-free-ai-apps-discover-the-best-options-today/", lastmod: "2024-11-29T04:32:58+00:00" },
  { url: "https://smartleadmagnet.com/blog/build-an-app-with-ai-easy-guide-for-beginners/", lastmod: "2024-11-30T04:32:11+00:00" },
  { url: "https://smartleadmagnet.com/blog/ai-to-create-apps-revolutionize-app-development/", lastmod: "2024-12-09T04:09:30+00:00" }
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