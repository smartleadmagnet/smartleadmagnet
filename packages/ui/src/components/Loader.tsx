
import React from 'react';
import { ImageIcon, TextIcon, CodeIcon } from '@radix-ui/react-icons';
import Spinner from './Spinner';

interface LoaderProps {
  type: 'image' | 'text' | 'code' | 'markdown';
}

const Loader: React.FC<LoaderProps> = ({ type }) => {
  return (
    <div className="prompt-loader bg-gray-900 w-[100%]">
      <Spinner />
      <div className="prompt-icon">
        {type === "image" && <ImageIcon className="h-8 w-8" />}
        {type === "text" && <TextIcon className="h-8 w-8" />}
        {type === "code" && <CodeIcon className="h-8 w-8" />}
        {type === "markdown" && <TextIcon className="h-8 w-8" />}
      </div>
    </div>
  );
};

export default Loader;