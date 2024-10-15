import Image from "next/image";
import React from "react";
import { Link } from "@/components/Link";
import { formatDate } from "@/lib/formatDate";
import type { MDXFrontMatter } from "@/lib/types";

interface PostListProps {
  posts: Array<MDXFrontMatter>;
}

export const PostList: React.FC<PostListProps> = ({ posts }) => {
  return (
    <ul>
      {posts.map((post) => (
        <li id={post.slug} className="my-4" key={post.slug}>
          {/*<div className="divider my-0 py-0"></div>*/}
          <div className="card card-side hover:cursor-pointer hover:bg-base-200 hover:shadow-lg">
            <figure className="min-w-[100px] sm:min-w-[205px]">
              <Image
                loading="lazy"
                width={100}
                height={100}
                // Make the image display full width
                style={{
                  width: "100%",
                  height: "auto",
                }}
                src="https://daisyui.com/images/stock/photo-1635805737707-575885ab0820.jpg"
                alt="Movie"
                placeholder="blur"
                blurDataURL="L2hvbWUvMTI4MC4wL3N0b2NrL3Bob3RvLTE2MzU4MDU3Mzc3MDctNTc1ODg1YWIwODIwLmpwZw=="
              />
            </figure>
            <div className="card-body">
              <dl>
                <dt className="sr-only">Published on</dt>
                <dd className="text-base font-medium leading-6">
                  <time dateTime="2023-11-08T00:00:00.000Z">{formatDate(post.date)}</time>
                </dd>
              </dl>
              <h2 className="card-title">
                <a href={`/blogs/${post.slug}`}>{post.title}</a>
              </h2>
              <div>
                {post.tags?.map((tag) => (
                  <Link
                    id={tag}
                    key={tag}
                    className="dark:hover:text-primary-400 mr-3 text-sm font-medium uppercase text-secondary"
                    href={`/posts/tags/${tag}`}
                  >
                    {tag}
                  </Link>
                ))}
              </div>
              <p className="overflow-hidden text-ellipsis">{post.description}</p>

              <div className="card-actions justify-end">
                <Link href={`/blogs/${post.slug}`} className="btn btn-primary">
                  Read More
                </Link>
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};
