import { notFound } from "next/navigation";
import React from "react";
import IntegrationSidebar from '@/components/Posts/IntegartionSidebar'; 
import { BlogMetadata, getPage } from "@/lib/mdx";
import Mdx from "@/components/MDX";

export type MDXContentProps = {
  slug: string;
  folderName?: string;
};

export default function MDXDocPage({ slug, folderName }: MDXContentProps) {
  const post = getPage<BlogMetadata>(folderName ? `${folderName}/${slug}` : slug);

  if (!post) {
    notFound();
  }

  const {
    metadata: { title, date, image, summary },
    content,
  } = post;

  return (
    <>
      <div className="mt-10 flex flex-col lg:flex-row mx-auto">
        <aside className="lg:min-w-[270px] lg:max-w-[270px] lg:mr-4 mb-4 lg:mb-0">
          <div className="sticky top-24 will-change-[transform,opacity]">
            <IntegrationSidebar />
          </div>
        </aside>
        
        <article className="flex-1 max-w-7xl flex flex-col items-center pl-4 lg:pl-10">
          <div className="w-full">
            <Mdx content={content} />
          </div>
        </article>
      </div>
    </>
  );
}
