import * as React from "react";

import { type BlogMetadata } from "@/lib/mdx";

import PostCard from "./PostCard";

type FilteredPostsProps = {
  posts: BlogMetadata[];
};

const FilteredPosts = (props: FilteredPostsProps) => {
  const { posts: filteredPosts } = props;
  // const [searchValue, setSearchValue] = React.useState("");
  //
  // const filteredPosts = posts.filter((post) => post.title.toLowerCase().includes(searchValue.toLowerCase()));

  return (
    <>
      {/*<div className="relative mb-8">*/}
      {/*  <label className="input input-bordered flex items-center gap-2">*/}
      {/*    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="size-4 opacity-70">*/}
      {/*      <path*/}
      {/*        fillRule="evenodd"*/}
      {/*        d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"*/}
      {/*        clipRule="evenodd"*/}
      {/*      />*/}
      {/*    </svg>*/}
      {/*    <input*/}
      {/*      type="text"*/}
      {/*      className="grow"*/}
      {/*      placeholder="Search articles"*/}
      {/*      aria-label="Search articles"*/}
      {/*      onChange={(e) => setSearchValue(e.target.value)}*/}
      {/*    />*/}
      {/*  </label>*/}
      {/*</div>*/}
      {/*{filteredPosts.length === 0 && <div className="my-24 text-center text-xl">No posts found</div>}*/}
      <PostCard posts={filteredPosts} />
    </>
  );
};

export default FilteredPosts;
