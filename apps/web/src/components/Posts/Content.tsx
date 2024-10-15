import Mdx from "@/components/MDX";
import { getTOC } from "@/components/MDX/get-toc";
import TableOfContents from "@/components/Posts/TableOfContents";
import classNames from "classnames";

type ContentProps = {
  content: string;
  hideTOC?: boolean;
};

const Content = async (props: ContentProps) => {
  const { content, hideTOC } = props;
  const toc = await getTOC(content);
  const hasTOC = !hideTOC && toc && toc.length > 0;

  return (
    <>
      <div className="mt-8 flex flex-row justify-between">
        <article
          className={classNames("w-full", hasTOC ? "flex max-w-7xl flex-col items-center justify-center" : "max-w-5xl")}
        >
          <Mdx content={content} />
        </article>
        {hasTOC && (
          <aside className="lg:min-w-[270px] lg:max-w-[270px]">
            <div className="sticky top-24 will-change-[transform,opacity]">
              {toc && toc.length > 0 && <TableOfContents toc={toc} />}
            </div>
          </aside>
        )}
      </div>
    </>
  );
};

export default Content;
