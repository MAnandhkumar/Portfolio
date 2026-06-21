import "server-only";

const dictionaries: Record<string, () => Promise<any>> = {
  en: () => import("@/dictionaries/en.json").then((module) => module.default),
  ta: () => import("@/dictionaries/ta.json").then((module) => module.default),
};

export const getDictionary = async (locale: string) => {
  // Safe default to 'en' if invalid locale passed
  const selectedLocale = dictionaries[locale] ? locale : "en";
  return dictionaries[selectedLocale]();
};
