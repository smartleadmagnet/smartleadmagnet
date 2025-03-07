// import {withSentryConfig} from "@sentry/nextjs";

const nextConfig = {
  transpilePackages: ["@smartleadmagnet/ui", "next-mdx-remote"],
  experimental: {
		serverComponentsExternalPackages: ['pdf-parse'],
		serverSourceMaps: false,
	},
  reactStrictMode: false,
  compiler: {
    styledComponents: true,
  },
  // trailingSlash: true,
  // crossOrigin: 'anonymous',
  // async rewrites() {
  //   return [
  //     {
  //       source: '/blog/',
  //       destination: `${process.env.NEXT_PUBLIC_WORDPRESS_BLOG_URL}/blog/`,
  //     },
  //     {
  //       source: '/blog/:path*/',
  //       destination: `${process.env.NEXT_PUBLIC_WORDPRESS_BLOG_URL}/blog/:path*/`,
  //     },
  //   ];
  // },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "media.smartleadmagnet.com",
      },
      {
        protocol: "https",
        hostname: "d3uu14lxe8399z.cloudfront.net",
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
      {
        protocol: "https",
        hostname: "*.public.blob.vercel-storage.com",
      },
      {
        protocol: "https",
        hostname: "cdn.smartereply.com",
      },
      {
        protocol: "https",
        hostname: "canny.io",
      },
      {
        protocol: "https",
        hostname: "via.placeholder.com",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "smartereply.com",
      },
      {
        protocol: "https",
        hostname: "example.com",
      },
      {
        protocol: "https",
        hostname: "daisyui.com",
      },
      {
        protocol: "https",
        hostname: "img.youtube.com",
      },
      {
        protocol: "https",
        hostname: "media.licdn.com",
      },
      {
        protocol: "https",
        hostname: "api.producthunt.com",
      },
      {
        protocol: "https",
        hostname: "smartereply.canny.io",
      },
      {
        protocol: "https",
        hostname: "placehold.co",
      },
      {
        protocol: "https",
        hostname: "source.unsplash.com",
      },
    ],
  },
};

// if (process.env.NODE_ENV === "development") {
//   await setupDevPlatform();
// }

export default nextConfig;
// export default withSentryConfig(nextConfig, {
//   org: "smartleadmagnet",
//   project: "javascript-nextjs",
//   silent: !process.env.CI,
//   hideSourceMaps: true,
//   disableLogger: true,
//   autoInstrumentServerFunctions: false,
//   autoInstrumentMiddleware: false,
//   autoInstrumentAppDirectory: false,
//   automaticVercelMonitors: false,
//   telemetry: false,
// });
