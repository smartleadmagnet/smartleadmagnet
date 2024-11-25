import MDXPage from "@/components/Posts/MDXPage";
import { getLocalMdxSeoTags } from "@/lib/seo";
import { WebPageJsonLd } from "next-seo";

const slug = "user-data-deletion";

export const dynamic = "force-static";

export async function generateMetadata() {
  return getLocalMdxSeoTags("user-data-deletion");
}

export default async function Posts() {
  const seo = getLocalMdxSeoTags("user-data-deletion");
  return (
    <>
      <WebPageJsonLd useAppDir description={seo.description!} id="user-data-deletion" />
      <MDXPage slug={slug} />
    </>
  );
}
