import { WebPageJsonLd } from "next-seo";
import { getAllPages } from "@/lib/mdx";
import PageTitle from "@smartleadmagnet/ui/components/PageTitle";
import PostCard from "@smartleadmagnet/ui/components/PostCard";
import * as React from "react";
import getSeo from "@/lib/seo";

export const dynamic = "force-static";

const directoryPath = "integrations";
export function generateMetadata() {
  const posts = getAllPages<any>(directoryPath);
  const names = posts.map((post) => post.name);

  return getSeo(
    {
      title: "SmartLeadMagnet Integrations",
      description: `SmartLeadMagnet Integrations with ${names.join(", ")}`,
    },
    directoryPath
  );
}

export default async function Posts() {
  const posts = getAllPages<any>(directoryPath);
  const modifiedPosts = posts.map((post) => {
    return {
      title: post.name, // change first later to Capital
      summary: post.title,
      slug: post.slug,
    };
  });
  const names = posts.map((post) => post.name);
  return (
    <>
      <WebPageJsonLd useAppDir description="SmartLeadMagnet Integrations" id="blogs" />
      <div className="mx-auto mb-10 max-w-7xl">
        <PageTitle
          title="SmartLeadMagnet Integrations"
          description={`SmartLeadMagnet Integrations with ${names.join(", ")}`}
        />
        <PostCard posts={modifiedPosts} rootPath={directoryPath} />
      </div>
    </>
  );
}
