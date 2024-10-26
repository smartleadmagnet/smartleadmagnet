"use client";

import React, { useState } from 'react';

interface InteractiveIframeProps {
  src: string;
  title: string;
}

export const InteractiveIframe: React.FC<InteractiveIframeProps> = ({ src, title }) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="iframe-container relative w-full">
      {isLoading && (
        <>
          <div className="absolute inset-0 bg-gradient-to-r from-primary-500 to-transparent animate-pulse"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        </>
      )}
      <iframe
        src={src}
        loading="lazy"
        title={title}
        allow="clipboard-write"
        allowFullScreen
        className={`w-full h-full absolute top-0 left-0 transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
        onLoad={() => setIsLoading(false)}
      ></iframe>
    </div>
  );
};
