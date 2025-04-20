"use client";

import { createContext, useState, ReactNode, Dispatch, SetStateAction } from "react";

type ContentIdCtx = {
  contentId: number | null;
  setContentId: Dispatch<SetStateAction<number | null>>;
};

export const ContentIdContext = createContext<ContentIdCtx | undefined>(undefined);

export function ContentIdProvider({ children }: { children: ReactNode }) {
  const [contentId, setContentId] = useState<number | null>(null);
  return (
    <ContentIdContext.Provider value={{ contentId, setContentId }}>
      {children}
    </ContentIdContext.Provider>
  );
}
