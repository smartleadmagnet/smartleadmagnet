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
        // @ts-ignore
        cdn(args, opts, name) {
          // Add WordPress origin to existing origins
          // @ts-ignore
          const wpOrigin: typeof args.origins[0] = {
            connectionAttempts: 3,
            connectionTimeout: 10,
            domainName: wordpressBlogUrl.replace(/^https?:\/\//, ''),
            originId: "wordpress-blog",
            customOriginConfig: {
              httpPort: 80,
              httpsPort: 443,
              originProtocolPolicy: "https-only",
              originSslProtocols: ["TLSv1.2"],
              originReadTimeout: 30,
              originKeepaliveTimeout: 5
            }
          };

          // @ts-ignore
          args.origins = [...args.origins, wpOrigin];

          // Add blog behavior to ordered behaviors
          const wpBehavior = {
            pathPattern: "blog*",
            targetOriginId: "wordpress-blog",
            viewerProtocolPolicy: "redirect-to-https",
            allowedMethods: ["GET", "HEAD", "OPTIONS"],
            cachedMethods: ["GET", "HEAD"],
            compress: true,
            minTtl: 0,
            maxTtl: 0,
            defaultTtl: 3600,
            forwardedValues: {
              queryString: false,
              cookies: {
                forward: "none"
              },
              headers: []
            }
          };

          args.orderedCacheBehaviors = [
            // @ts-ignore
            ...(args.orderedCacheBehaviors || []),
            wpBehavior
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
