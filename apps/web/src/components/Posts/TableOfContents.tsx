"use client";

import classNames from "classnames";
import * as React from "react";
import { useScrollspy } from "@/hooks/useScrollspy";
import { TOC } from "@/lib/mdx";

type TableOfContentsProps = {
  toc: TOC[];
};

const TableOfContents = (props: TableOfContentsProps) => {
  const { toc } = props;
  const activeId = useScrollspy(
    toc.map((item) => item.url),
    { rootMargin: "0% 0% -80% 0%" }
  );

  return (
    <div className="hidden rounded-xl border border-neutral p-5 shadow-lg lg:block">
      <div className="mb-4 pl-4">Table of Contents</div>
      <div>
        {toc
          .filter((item) => item.depth <= 3)
          .map((item) => {
            const { title, url, depth } = item;

            return (
              <a
                key={url}
                href={`#${url}`}
                className={classNames(
                  "my-0.5 block overflow-hidden overflow-ellipsis whitespace-nowrap rounded-xl py-2.5 pr-2.5 text-sm hover:border-l-2 hover:bg-cyan-500 hover:text-white",
                  url === activeId && " bg-cyan-500 text-white",
                  depth >= 3 ? "text-gray-content/70" : ""
                )}
                style={{
                  paddingLeft: depth !==1 ?(depth - 1) * 8: 10,
                }}
              >
                {title} {depth}
              </a>
            );
          })}
      </div>
    </div>
  );
};

export default TableOfContents;
