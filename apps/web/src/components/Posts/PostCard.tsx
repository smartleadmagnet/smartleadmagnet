import * as React from "react";

import { BlurImage } from "@/components/BlueImage";
import { Link } from "@/components/Link";
import { type BlogMetadata } from "@/lib/mdx";
import FormattedDate from "@/components/Posts/FormattedDate";

type PostCardsProps = {
  posts: BlogMetadata[];
};
type PostCardProps = BlogMetadata;

const PostCards = (props: PostCardsProps) => {
  const { posts } = props;

  return (
    <div className="grid gap-4 sm:grid md:grid-cols-2">
      {posts.map((post) => (
        <PostCard key={post.slug} {...post} />
      ))}
    </div>
  );
};

const PostCard = (props: PostCardProps) => {
  const { slug, title, summary, date, image } = props;

  return (
    <Link
      href={`/blogs/${slug}`}
      className="group/bento shadow-input group flex cursor-pointer flex-col justify-between space-y-4 rounded-xl border-2 border-gray-300 p-4 px-2 shadow-xl transition duration-200 hover:shadow-xl"
    >
      <BlurImage
        src={image ? image : `/blogs/${slug}/cover.png`}
        className="aspect-w-16 aspect-h-9 relative max-h-[300px] rounded-lg border-2 border-gray-400"
        width={1200}
        height={300}
        lazy={false}
        imageClassName="transition-transform group-hover:scale-105"
        alt={title}
      />
      <FormattedDate date={date} />
      <div className="flex flex-col px-2 py-4">
        <h3 className="font-title text-2xl font-bold">{title}</h3>
        <p className="text-muted-foreground mt-2">{summary}</p>
      </div>
    </Link>
  );
};

export default PostCards;
