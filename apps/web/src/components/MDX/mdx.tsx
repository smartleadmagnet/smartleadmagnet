import rehypeShiki from "@shikijs/rehype";
import { File, Files, Folder } from "fumadocs-ui/components/files";
import { MDXComponents } from "mdx/types";
import { MDXRemote } from "next-mdx-remote/rsc";
import * as React from "react";

import remarkGfm from "remark-gfm";
import Alert from "@/components/Alerts";
import { BlurImage } from "@/components/BlueImage";
import { Link } from "@/components/Link";
import { AlertDescription, AlertTitle } from "@/components/MDX/alert";
import Heading from "@/components/MDX/heading";
import { remarkHeading } from "@/components/MDX/remark-heading";
import { Table } from "@/components/MDX/table";
import ImageZoom from "@/components/Posts/ImageZoom";
import Checkbox from "./checkbox";
import ItemGrid from "./item-grid";
import LinkCard from "./link-card";
import Logo from "./logo";
import Pre from "./pre";
import Video from "./video";

type MdxProps = {
  content: string;
};

interface VideoEmbedProps {
  url: string;
}

const VideoEmbed: React.FC<VideoEmbedProps> = ({ url }) => {
  const videoId = url.split("v=")[1];
  const embedUrl = `https://www.youtube.com/embed/${videoId}`;

  return (
    <div style={{ position: "relative", paddingBottom: "56.25%", height: 0 }}>
      <iframe
        src={embedUrl}
        style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
        frameBorder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="YouTube video player"
      ></iframe>
    </div>
  );
};

export const components: MDXComponents = {
  h2: (props: React.ComponentPropsWithoutRef<"h2">) => <Heading as="h2" {...props} />,
  h3: (props: React.ComponentPropsWithoutRef<"h3">) => <Heading as="h3" {...props} />,
  h4: (props: React.ComponentPropsWithoutRef<"h4">) => <Heading as="h4" {...props} />,
  h5: (props: React.ComponentPropsWithoutRef<"h5">) => <Heading as="h5" {...props} />,
  h6: (props: React.ComponentPropsWithoutRef<"h6">) => <Heading as="h6" {...props} />,
  a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
    const { children, ...rest } = props;

    return (
      <Link variant="article" {...rest}>
        {children}
      </Link>
    );
  },
  Image: (props: React.ComponentPropsWithoutRef<typeof BlurImage>) => {
    const { alt, ...rest } = props;

    return (
      <>
        <ImageZoom>
          <BlurImage className="rounded-lg border" alt={alt} {...rest} />
        </ImageZoom>
        <figcaption className="mt-4 text-center">{alt}</figcaption>
      </>
    );
  },
  img: ({ src, alt }) => {
    // Check if the alt text is 'AI-Powered Outlook' and src contains YouTube URL
    if (alt && src && src.includes("youtube.com/watch")) {
      return <VideoEmbed url={src} />;
    }
    return <img src={src} alt={alt} className="w-auto" />;
  },
  pre: Pre,
  input: Checkbox,

  // Custom components
  Alert: (props: React.ComponentPropsWithoutRef<typeof Alert>) => <Alert {...props} />,
  AlertTitle: (props: React.ComponentPropsWithoutRef<typeof AlertTitle>) => <AlertTitle {...props} />,
  AlertDescription: (props: React.ComponentPropsWithoutRef<typeof AlertDescription>) => <AlertDescription {...props} />,
  Table,
  ItemGrid,
  Video,
  LinkCard,
  Logo,
  Files,
  File,
  Folder,
  VideoEmbed,
};

const Mdx = (props: MdxProps) => {
  const { content } = props;
  const mdxOptions = {
    remarkPlugins: [remarkHeading, remarkGfm],
    rehypePlugins: [[rehypeShiki, { theme: "nord" }]],
    format: "mdx",
  };

  return (
    <div className="prose w-full">
      <MDXRemote
        source={content}
        components={components}
        options={{
          // @ts-ignore
          mdxOptions,
        }}
      />
    </div>
  );
};

export default Mdx;