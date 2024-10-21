import MDXDocPage from "@/components/Posts/MDXDocPage";
import { getLocalMdxSeoTags } from "@/lib/seo";
import { WebPageJsonLd } from "next-seo";

const slug = "wordpress";

export function generateMetadata() {
  return getLocalMdxSeoTags("wordpress");
}

export default async function Posts() {
  const seo = getLocalMdxSeoTags("wordpress");
  return (
    <>
      <WebPageJsonLd useAppDir description={seo.description!} id="wordpress" />
      <MDXDocPage slug={slug} />
    </>
  );
}
