/**
 * Adapted from https://github.com/delbaoliveira/website/blob/59e6f181ad75751342ceaa8931db4cbcef86b018/ui/BlurImage.tsx
 */
"use client";

import classNames from "classnames";
import NextImage from "next/image";
import * as React from "react";

type ImageProps = {
  imageClassName?: string;
  lazy?: boolean;
} & React.ComponentPropsWithoutRef<typeof NextImage>;

export const BlurImage = React.forwardRef<HTMLDivElement, ImageProps>((props, ref) => {
  const { alt, src, className, imageClassName, lazy = true, ...rest } = props;
  const [isLoading, setLoading] = React.useState(true);

  return (
    <div className={classNames("overflow-hidden", isLoading && "animate-pulse", className)} ref={ref}>
      <NextImage
        className={classNames(isLoading && "scale-[1.02] blur-xl grayscale", imageClassName)}
        style={{
          transition: "filter 700ms ease, transform 150ms ease",
        }}
        src={src}
        alt={alt}
        loading={lazy ? "lazy" : undefined}
        priority={!lazy}
        quality={100}
        onLoad={() => setLoading(false)}
        {...rest}
      />
    </div>
  );
});

BlurImage.displayName = "Image";
