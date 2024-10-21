import MDXDocPage from "@/components/Posts/MDXDocPage";
import { getLocalMdxSeoTags } from "@/lib/seo";
import { WebPageJsonLd } from "next-seo";

const slug = "shopify";

export function generateMetadata() {
  return getLocalMdxSeoTags("shopify");
}

export default async function Posts() {
  const seo = getLocalMdxSeoTags("shopify");
  return (
    <>
      <WebPageJsonLd useAppDir description={seo.description!} id="shopify" />
      <MDXDocPage slug={slug} />
    </>
  );
}
