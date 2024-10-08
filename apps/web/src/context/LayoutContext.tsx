"use client";
import React, { createContext, useContext, useState } from 'react';
import { ChildItem } from '../types/builder'; // Adjust the import according to your project structure

interface LayoutContextType {
  elementsList: any; // TODO need to fix it BuilderItem[];
  setElementsList: React.Dispatch<React.SetStateAction<ChildItem[]>>;
}

const LayoutContext = createContext<LayoutContextType | undefined>(undefined);

export const LayoutProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [elementsList, setElementsList] = useState<ChildItem[]>([]);

  return (
    <LayoutContext.Provider value={{ elementsList, setElementsList }}>
      {children}
    </LayoutContext.Provider>
  );
};

export const useLayoutContext = (): LayoutContextType => {
  const context = useContext(LayoutContext);
  if (context === undefined) {
    throw new Error('useBuilderContext must be used within a BuilderProvider');
  }
  return context;
};
