import classNames from "classnames";
import * as React from "react";
import { AspectRatio } from "@/components/MDX/aspect-ratio";

type VideoProps = {
  src: string;
  width: number;
  height: number;
} & React.ComponentPropsWithoutRef<"video">;

const Video = (props: VideoProps) => {
  const { src, width, height, controls = true, className, ...rest } = props;

  return (
    <AspectRatio ratio={16 / 9}>
      <video
        className={classNames("object-fit my-4 rounded-lg shadow-lg", className)}
        loop
        muted
        src={src}
        controls={controls}
        width={width}
        height={height}
        {...rest}
      />
    </AspectRatio>
  );
};

export default Video;
