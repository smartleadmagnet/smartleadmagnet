import MDXDocPage from "@/components/Posts/MDXDocPage";
import { getLocalMdxSeoTags } from "@/lib/seo";
import { WebPageJsonLd } from "next-seo";

const slug = "integrations/shopify";

export function generateMetadata() {
  return getLocalMdxSeoTags("shopify", "integrations");
}

export default async function Posts() {
  const seo = getLocalMdxSeoTags("shopify", "integrations");
  return (
    <>
      <WebPageJsonLd useAppDir description={seo.description!} id="shopify" />
      <MDXDocPage slug={slug} />
    </>
  );
}
