import { GoogleAnalytics as GA } from "@next/third-parties/google";

export default function GoogleAnalytics() {
  return <GA gaId={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID!} />;
}
