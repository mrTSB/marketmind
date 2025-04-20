"use client";

import { createContext, useState, ReactNode, Dispatch, SetStateAction, useEffect } from "react";

type ContentIdCtx = {
  contentId: string | null;
  setContentId: Dispatch<SetStateAction<string | null>>;
};

export const ContentIdContext = createContext<ContentIdCtx | undefined>(undefined);

export function ContentIdProvider({ children }: { children: ReactNode }) {
  const [contentId, setContentId] = useState<string | null>(null);
  
  // Load contentId from localStorage on initialization
  useEffect(() => {
    const storedContentId = localStorage.getItem('contentId');
    if (storedContentId) {
      setContentId(storedContentId);
    }
  }, []);
  
  // Save contentId to localStorage whenever it changes
  useEffect(() => {
    if (contentId) {
      localStorage.setItem('contentId', contentId);
    } else {
      localStorage.removeItem('contentId');
    }
  }, [contentId]);
  
  return (
    <ContentIdContext.Provider value={{ contentId, setContentId }}>
      {children}
    </ContentIdContext.Provider>
  );
}
