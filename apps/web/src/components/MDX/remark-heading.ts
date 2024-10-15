import Slugger from "github-slugger";
import { type Plugin } from "unified";
import { visit } from "unist-util-visit";
import { TOC } from "@/lib/mdx";

const slugger = new Slugger();

function findFirstValue(node: any): string | undefined {
  // Check if the current node has a value and return it if found
  if (node.value) {
    return node.value;
  }

  // If the node has children, recursively search for the value
  if (node.children && node.children.length > 0) {
    for (const child of node.children) {
      const foundValue = findFirstValue(child);
      if (foundValue !== undefined) {
        return foundValue; // Return the first found value immediately
      }
    }
  }

  return undefined; // Return undefined if no value is found
}

export const remarkHeading: Plugin = () => {
  return (tree, file) => {
    const toc: TOC[] = [];
    slugger.reset();

    visit(tree, "heading", (node: any) => {
      node.data ||= {};
      node.data.hProperties ||= {};

      const text = findFirstValue(node.children[0]) as string;
      const id = slugger.slug(text).replace(/[^a-zA-Z]/g, "-");

      node.data.hProperties.id = id;

      toc.push({
        title: text,
        url: id,
        depth: node.depth,
      });

      return "skip";
    });

    file.data.toc = toc;
  };
};
