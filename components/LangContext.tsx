"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { dict, Dict, Lang } from "@/lib/i18n";

type LangContextType = {
  lang: Lang;
  t: Dict;
  toggle: () => void;
};

const LangContext = createContext<LangContextType>({
  lang: "en",
  t: dict.en,
  toggle: () => {},
});

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");
  const toggle = () => setLang((l) => (l === "en" ? "es" : "en"));
  return (
    <LangContext.Provider value={{ lang, t: dict[lang], toggle }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  return useContext(LangContext);
}
