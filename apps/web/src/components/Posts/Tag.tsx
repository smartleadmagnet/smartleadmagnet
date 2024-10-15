import { Link } from "@/components/Link";
import { slugify } from "@/lib/utils";
import classNames from "classnames";

interface TagProps {
  href: string;
  children: string;
}

export const Tag: React.FC<TagProps> = ({ href, children }) => {
  return (
    <Link
      href={href}
      className={classNames(
        "inline-block rounded-full border px-2.5 py-0.5 text-sm hover:underline",
        "border-gray-200 bg-gray-100",
        "dark:border-gray-700 dark:bg-gray-800"
      )}
    >
      #{slugify(children)}
    </Link>
  );
};
