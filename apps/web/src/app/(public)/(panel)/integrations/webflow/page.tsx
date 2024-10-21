import MDXDocPage from "@/components/Posts/MDXDocPage";
import { getLocalMdxSeoTags } from "@/lib/seo";
import { WebPageJsonLd } from "next-seo";

const slug = "webflow";

export function generateMetadata() {
  return getLocalMdxSeoTags("webflow");
}

export default async function Posts() {
  const seo = getLocalMdxSeoTags("webflow");
  return (
    <>
      <WebPageJsonLd useAppDir description={seo.description!} id="webflow" />
      <MDXDocPage slug={slug} />
    </>
  );
}
