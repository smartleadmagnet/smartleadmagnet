import MDXDocPage from "@/components/Posts/MDXDocPage";
import { getLocalMdxSeoTags } from "@/lib/seo";
import { WebPageJsonLd } from "next-seo";

const slug = "hubspot";

export function generateMetadata() {
  return getLocalMdxSeoTags("hubspot");
}

export default async function Posts() {
  const seo = getLocalMdxSeoTags("hubspot");
  return (
    <>
      <WebPageJsonLd useAppDir description={seo.description!} id="hubspot" />
      <MDXDocPage slug={slug} />
    </>
  );
}
