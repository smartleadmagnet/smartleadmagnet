import MDXPage from "@/components/Posts/MDXPage";
import { getLocalMdxSeoTags } from "@/lib/seo";
import { WebPageJsonLd } from "next-seo";

const slug = "privacy-policy";

export function generateMetadata() {
  return getLocalMdxSeoTags("privacy-policy");
}

export default async function Posts() {
  const seo = getLocalMdxSeoTags("privacy-policy");
  return (
    <>
      <WebPageJsonLd useAppDir description={seo.description!} id="privacy-policy" />
      <MDXPage slug={slug} />
    </>
  );
}
