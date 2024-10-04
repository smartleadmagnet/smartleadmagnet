

// Define types for the child item
export type ChildItem = {
    icon: string;
    id: string;
    type: string;
    name: string;
    label: string;
    value: string;
    formElement?: boolean;
    required?: boolean;
  };
  
  // Define types for the parent item
  export type BuilderItem = {
    title: string;
    children: ChildItem[];
    id: string;
    
  };
  
  // Define props for the BuilderComponent
  export type BuilderComponentProps = {
    builderItems: BuilderItem[];
  };
