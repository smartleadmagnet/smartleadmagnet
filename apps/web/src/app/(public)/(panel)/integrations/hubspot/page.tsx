import MDXDocPage from "@/components/Posts/MDXDocPage";
import { getLocalMdxSeoTags } from "@/lib/seo";
import { WebPageJsonLd } from "next-seo";

const slug = "integrations/hubspot";

export const dynamic = "force-static";

export function generateMetadata() {
  return getLocalMdxSeoTags("hubspot", "integrations");
}

export default async function Posts() {
  const seo = getLocalMdxSeoTags("hubspot", "integrations");
  return (
    <>
      <WebPageJsonLd useAppDir description={seo.description!} id="hubspot" />
      <MDXDocPage slug={slug} />
    </>
  );
}
