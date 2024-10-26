import { Metadata } from "next";
import { getPage } from "@/lib/mdx";

const title = "SmartLeadMagnet: AI Lead Magnets to Boost Website Traffic";
const description =
  "Drive more traffic to your website with SmartLeadMagnet’s AI-powered lead magnets. Capture leads, grow your audience, and boost your business easily.";

const metadata: Metadata = {
  title,
  description,
  applicationName: "SmartLeadMagnet",
  metadataBase: new URL("https://smartleadmagnet.com"),
  authors: [
    {
      name: "SmartLeadMagnet Team",
      url: "https://smartleadmagnet.com", // Update this URL to your team's website if available
    },
  ],
  generator: "Smart Lead Magnet",
  keywords: [],
  referrer: "origin",
  creator: "SmartLeadMagnet",
  publisher: "SmartLeadMagnet",
  robots: "index, follow",
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
    siteName: "SmartLeadMagnet",
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
  // verification: {
  //   google: "1234567890", // Update with your Google verification code
  //   yandex: "0987654321", // Update with your Yandex verification code
  // },
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

const getSeo = (data?: Metadata, urlPath?: string) => {
  const canonicalUrl = !urlPath ? "https://smartleadmagnet.com" : `https://smartleadmagnet.com/${urlPath}`;
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
  const filePath = folderName ? `${folderName}/${slug}` : slug;
  const post = getPage<any>(filePath);
  const { title, summary } = post?.metadata;
  return getSeo(
    {
      title: title,
      description: summary,
    },
    filePath
  );
};

export const getBlogMdxSeoTags = (slug: string, folderName?: string) => {
  const url = process.env.NEXT_PUBLIC_SITE_URL!;
  const post = getPage<any>(folderName ? `${folderName}/${slug}` : slug);
  const { date, modifiedTime, title, summary } = post?.metadata;
  return getSeo(
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

export default getSeo;
