import { Metadata } from "next";
import { getPage } from "@/lib/mdx";

const title = "SmartEReply: Boost Productivity with Human-Like AI Replies";
const description =
  "Enhance productivity with SmartEReply's AI-driven, human-like replies. Experience seamless communication and efficiency like never before.";

const metadata: Metadata = {
  title,
  description,
  applicationName: "SmartEReply",
  metadataBase: new URL("https://SmartEReply.com"),
  authors: [
    {
      name: "DCoderAI Team",
      url: "https://dcoder.ai", // Update this URL to your team's website if available
    },
  ],
  generator: "Custom Web Application",
  keywords: [
    "linkedin ai tools",
    "generative ai",
    "ai tool",
    "ai generated content",
    "best ai tools",
    "free ai tools",
    "ai for business",
    "linkedin automation software",
    "automated linkedin messaging",
    "best linkedin automation tools",
    "ai for content creation",
    "ai tools for linkedin",
    "free generative ai",
    "content generation ai",
    "SmartEReply",
    "create content with ai",
    "ai tools for small business",
    "generate content using ai",
    "ai in linkedin",
    "linkedin ai jobs",
    "ai jobs linkedin",
    "LinkedIn AI content automation",
    "AI LinkedIn profile optimization",
    "AI personalized connection requests",
    "AI direct message generation",
    "AI LinkedIn multilingual support",
    "LinkedIn comment management",
    "LinkedIn AI assistant jobs",
    "LinkedIn AI engagement strategies",
    "AI-driven LinkedIn networking",
    "AI-enhanced LinkedIn visibility",
    "LinkedIn AI interaction boost",
    "Efficient LinkedIn AI communication",
    "LinkedIn AI profile insights",
    "LinkedIn AI cultural adaptation",
    "LinkedIn AI response automation",
  ],
  referrer: "origin",
  creator: "DCoderAi",
  publisher: "DCoderAI",
  robots: "index, follow",
  // alternates: {
  //   canonical: "/",
  // //   languages: languages,
  // },
  icons: [
    { rel: "icon", url: "/favicon.ico" }, // Update paths as necessary
    { rel: "apple-touch-icon", url: "/apple-touch-icon.png" },
  ],
  manifest: "/manifest.json",
  openGraph: {
    type: "website",
    // url: "https://SmartEReply.com",
    title,
    description,
    siteName: "SmartEReply",
    images: [
      {
        url: "/og-image.png", // Update path as necessary
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@DCoderAI", // Update with SmartEReply's actual Twitter handle
    creator: "@DCoderAI", // Update with creator's Twitter handle if different
    title,
    description,
  },
  // Update or remove verification codes as necessary
  verification: {
    google: "1234567890", // Update with your Google verification code
    yandex: "0987654321", // Update with your Yandex verification code
  },
  appleWebApp: {
    capable: true,
    title,
    statusBarStyle: "black-translucent",
  },
  formatDetection: {
    telephone: false,
  },
  abstract: description,
};

const getSeoTags = (data?: Metadata, urlPath?: string) => {
  const canonicalUrl = !urlPath ? "https://smartereply.com" : `https://smartereply.com/${urlPath}`;
  return {
    ...metadata,
    ...data,
    openGraph: {
      ...metadata.openGraph,
      url: canonicalUrl,
      ...data?.openGraph,
    },
    twitter: {
      ...metadata.twitter,
      ...data?.twitter,
    },
    alternats: {},
    alternates: {
      canonical: canonicalUrl,
      ...data?.alternates,
    },
    authors: {
      ...metadata.authors,
      ...data?.authors,
    },
    keywords: [],
  };
};

export const getLocalMdxSeoTags = (slug: string, folderName?: string) => {
  console.log(`${folderName}/${slug}`);
  const post = getPage<any>(folderName ? `${folderName}/${slug}` : slug);
  const { title, summary } = post?.metadata;
  return getSeoTags(
    {
      title: title,
      description: summary,
    },
    slug
  );
};

export const getBlogMdxSeoTags = (slug: string, folderName?: string) => {
  const url = process.env.NEXT_PUBLIC_SITE_URL!;
  const post = getPage<any>(folderName ? `${folderName}/${slug}` : slug);
  const { date, modifiedTime, title, summary, tags } = post?.metadata;
  return getSeoTags(
    {
      title: title,
      description: summary,
      keywords: [],
      openGraph: {
        type: "article",
        title,
        description: summary,
        url: `${url}/blogs/${slug}`,
        images: `${url}/api/og/${slug}`,
        modifiedTime: modifiedTime || new Date().toISOString(),
        publishedTime: date || new Date().toISOString(),
      },
      twitter: {
        card: "summary_large_image",
        site: `${url}/blogs/${slug}`,
        title,
        description: summary,
        images: `${url}/api/og/${slug}`,
      },
    },
    `blogs/${slug}`
  );
};

export default getSeoTags;
