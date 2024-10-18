// This file configures the initialization of Sentry on the server.
// The config you add here will be used whenever the server handles a request.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: "https://9ac7d077d765d436922d427dedabe46e@o4508142638727168.ingest.us.sentry.io/4508142639972352",

  // Setting this option to true will print useful information to the console while you're setting up Sentry.
  debug: false,
});
