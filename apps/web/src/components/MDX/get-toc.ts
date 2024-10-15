import { remark } from "remark";
import { remarkHeading } from "@/components/MDX/remark-heading";
import { TOC } from "@/lib/mdx";

export const getTOC = async (content: string) => {
  const result = await remark().use(remarkHeading).process(content);

  if ("toc" in result.data) {
    return result.data.toc as TOC[];
  }

  return [];
};
