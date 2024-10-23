import { GoogleTagManager as GT } from "@next/third-parties/google";

export default function GoogleTagManager() {
  return <GT gtmId={process.env.NEZT_PUBLIC_GOOGLE_TAG_MANGER_ID!} />;
}
