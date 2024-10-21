import MDXDocPage from "@/components/Posts/MDXDocPage";
import { getLocalMdxSeoTags } from "@/lib/seo";
import { WebPageJsonLd } from "next-seo";

const slug = "integrations/webflow";

export function generateMetadata() {
  return getLocalMdxSeoTags("webflow", "integrations");
}

export default async function Posts() {
  const seo = getLocalMdxSeoTags("webflow", "integrations");
  return (
    <>
      <WebPageJsonLd useAppDir description={seo.description!} id="webflow" />
      <MDXDocPage slug={slug} />
    </>
  );
}
