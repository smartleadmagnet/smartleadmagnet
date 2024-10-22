import MDXDocPage from "@/components/Posts/MDXDocPage";
import { getLocalMdxSeoTags } from "@/lib/seo";
import { WebPageJsonLd } from "next-seo";

const slug = "integrations/zapier";
export const dynamic = "force-static";

export function generateMetadata() {
  return getLocalMdxSeoTags("zapier", "integrations");
}

export default async function Posts() {
  const seo = getLocalMdxSeoTags("zapier", "integrations");
  return (
    <>
      <WebPageJsonLd useAppDir description={seo.description!} id="zapier" />
      <MDXDocPage slug={slug} />
    </>
  );
}
