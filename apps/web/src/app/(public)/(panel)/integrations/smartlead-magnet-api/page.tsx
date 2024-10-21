import MDXDocPage from "@/components/Posts/MDXDocPage";
import { getLocalMdxSeoTags } from "@/lib/seo";
import { WebPageJsonLd } from "next-seo";

const slug = "smartlead-magnet-api";

export function generateMetadata() {
  return getLocalMdxSeoTags("smartlead-magnet-api");
}

export default async function Posts() {
  const seo = getLocalMdxSeoTags("smartlead-magnet-api");
  return (
    <>
      <WebPageJsonLd useAppDir description={seo.description!} id="smartlead-magnet-api" />
      <MDXDocPage slug={slug} />
    </>
  );
}
