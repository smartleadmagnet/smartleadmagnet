// Define types for the child item
type ChildItem = {
    icon: string;
    title: string;
  };
  
  // Define types for the parent item
  type BuilderItem = {
    title: string;
    children: ChildItem[];
  };
  
  // Define props for the BuilderComponent
  export type BuilderComponentProps = {
    builderItems: BuilderItem[];
  };
