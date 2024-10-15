import { notFound } from "next/navigation";
import React from "react";
import Content from "@/components/Posts/Content";
import Header from "@/components/Posts/Header";
import { BlogMetadata, getPage } from "@/lib/mdx";

export type MDXContentProps = {
  slug: string;
  folderName?: string;
};

export default function MDXPage({ slug, folderName }: MDXContentProps) {
  const post = getPage<BlogMetadata>(folderName ? `${folderName}/${slug}` : slug);

  if (!post) {
    notFound();
  }

  const {
    metadata: { title, date, image, summary },
    content,
  } = post;

  return (
    <div className="flex max-w-7xl flex-col items-center justify-center">
      <Header date={date} title={summary} slug={slug} image={image} />
      <Content content={content} />
    </div>
  );
}
