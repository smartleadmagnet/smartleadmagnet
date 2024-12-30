/// <reference path="./.sst/platform/config.d.ts" />

const wordpressBlogUrl = "https://silver-caribou-278976.hostingersite.com";

export default $config({
  app(input) {
    return {
      name: "web",
      removal: input?.stage === "production" ? "retain" : "remove",
      protect: ["production"].includes(input?.stage),
      home: "aws",
    };
  },
  async run() {
    new sst.aws.Nextjs("SmartLeadMagnetWeb", {
      domain: "smartleadmagnet.com",
      transform: {
        cdn(args, opts, name) {
          // Add WordPress origin to existing origins
          args.origins = [
            ...args.origins,
            {
              id: "wordpress-blog",
              domainName: wordpressBlogUrl.replace(/^https?:\/\//, ''),
              customOriginConfig: {
                httpPort: 80,
                httpsPort: 443,
                originProtocolPolicy: "https-only",
                originSslProtocols: ["TLSv1.2"]
              }
            }
          ];

          // Add blog behavior to ordered behaviors
          args.orderedCacheBehaviors = [
            ...(args.orderedCacheBehaviors || []),
            {
              pathPattern: "/blog/*",
              targetOriginId: "wordpress-blog",
              viewerProtocolPolicy: "redirect-to-https",
              allowedMethods: ["GET", "HEAD", "OPTIONS"],
              cachedMethods: ["GET", "HEAD"],
              compress: true,
              forwardedValues: {
                queryString: true,
                cookies: {
                  forward: "none"
                },
                headers: []
              }
            }
          ];

          return args;
        },
        server: {
          timeout: "3 minutes"
        }
      }
    });
  },
});
