"use client";

import * as React from "react";
import { BlurImage } from "@/components/BlueImage";
import ImageZoom from "@/components/Posts/ImageZoom";
import { useFormattedDate } from "@/hooks/useFormattedDate";

type HeaderProps = {
  date: string;
  title: string;
  slug: string;
  image?: string;
};

const Header = (props: HeaderProps) => {
  const { date, title, slug, image } = props;
  const formattedDate = useFormattedDate(date, {
    format: "MMMM dd, yyyy",
    loading: "--",
  });
  const coverImage = image ? image : `/blogs/${slug}/cover.png`;

  return (
    <div className="space-y-16 py-16 sm:pt-24">
      <div className="space-y-4">
        <h1 className="font-title bg-clip-text text-4xl md:text-5xl">{title}</h1>
        <div className="md:mx-auto">
          <div className="text-muted-foreground">Published on</div>
          <div>{formattedDate}</div>
        </div>
      </div>
      <ImageZoom
        zoomImg={{
          src: coverImage,
          alt: title,
        }}
      >
        <BlurImage
          src={coverImage}
          className="aspect-w-16 aspect-h-9 flex h-full w-full rounded-lg border-2 shadow-2xl "
          width={1260}
          height={300}
          lazy={false}
          alt={title}
        />
      </ImageZoom>
    </div>
  );
};

export default Header;
