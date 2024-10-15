import MDXPage from "@/components/Posts/MDXPage";
import { getLocalMdxSeoTags } from "@/lib/seo";
import { WebPageJsonLd } from "next-seo";

const slug = "terms-and-conditions";

export async function generateMetadata() {
  return getLocalMdxSeoTags("terms-and-conditions");
}

export default async function Posts() {
  const seo = getLocalMdxSeoTags("terms-and-conditions");
  return (
    <>
      <WebPageJsonLd useAppDir description={seo.description!} id="terms-and-conditions" />
      <MDXPage slug={slug} />
    </>
  );
}
