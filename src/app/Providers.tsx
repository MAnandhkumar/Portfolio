"use client";

import { LanguageProvider } from "@/languages/Language.context";
import ThemeManager from "@/components/ThemeManager/ThemeManager";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <LanguageProvider>
      <ThemeManager>{children}</ThemeManager>
    </LanguageProvider>
  );
}
