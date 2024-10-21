import MDXDocPage from "@/components/Posts/MDXDocPage";
import { getLocalMdxSeoTags } from "@/lib/seo";
import { WebPageJsonLd } from "next-seo";

const slug = "integrations/wix";

export function generateMetadata() {
  return getLocalMdxSeoTags("wix", "integrations");
}

export default async function Posts() {
  const seo = getLocalMdxSeoTags("wix", "integrations");
  return (
    <>
      <WebPageJsonLd useAppDir description={seo.description!} id="wix" />
      <MDXDocPage slug={slug} />
    </>
  );
}
