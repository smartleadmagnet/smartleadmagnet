import MDXDocPage from "@/components/Posts/MDXDocPage";
import { getLocalMdxSeoTags } from "@/lib/seo";
import { WebPageJsonLd } from "next-seo";

const slug = "integrations/squarespace";
export const dynamic = "force-static";

export function generateMetadata() {
  return getLocalMdxSeoTags("squarespace", "integrations");
}

export default async function Posts() {
  const seo = getLocalMdxSeoTags("squarespace", "integrations");
  return (
    <>
      <WebPageJsonLd useAppDir description={seo.description!} id="squarespace" />
      <MDXDocPage slug={slug} />
    </>
  );
}
