import React from "react";

type PageTitleProps = {
  title: string;
  description: string;
  animate?: boolean;
};

const PageTitle = (props: PageTitleProps) => {
  const { title, description, animate = true } = props;

  return (
    <div className="mt-16 sm:mt-16">
      <h1 className="my-4 text-4xl font-bold md:text-5xl">{title}</h1>
      <p className="text-muted-foreground mb-8">{description}</p>
      <div className="divider" />
    </div>
  );
};

export default PageTitle;
