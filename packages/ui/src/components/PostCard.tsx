import * as React from "react";
import Link from "next/link";

type PostCardsProps = {
  posts: any[];
  rootPath?: string;
};
type PostCardProps = any;

const PostCards = (props: PostCardsProps) => {
  const { posts } = props;

  return (
    <div className="grid gap-4 sm:grid md:grid-cols-2">
      {posts.map((post) => (
        <PostCard key={post.slug} {...post} link={post.slug} />
      ))}
    </div>
  );
};

const PostCard = (props: PostCardProps) => {
  const { title, summary, link } = props;

  return (
    <Link
      href={link}
      className="group/bento shadow-input group flex cursor-pointer flex-col justify-between space-y-4 rounded-xl border-2 border-gray-300 p-4 px-2 shadow-xl transition duration-200 hover:shadow-xl"
    >
      <div className="flex flex-col px-2 py-4">
        <h3 className="font-title text-2xl font-bold">{title}</h3>
        <p className="text-muted-foreground mt-2">{summary}</p>
      </div>
    </Link>
  );
};

export default PostCards;
