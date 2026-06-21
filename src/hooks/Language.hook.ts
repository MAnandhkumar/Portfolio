import { useContext, useEffect } from "react";
import { usePathname } from "next/navigation";
import { LangugeContext } from "../languages/Language.context";
import { useTranslation } from "react-i18next";
import CFG from "../config/config.json"; // App config for default language
import { localStorageAccessor } from "../utils/browserStorage"; // Custom hook for handling browser storage

/* Localstorage language value & handlers */
const [LgetLang, LsetLang] = localStorageAccessor<string>("lang");

// Custom hook for managing the language settings for React i18n
const useLang = () => {
  // Language context to get and change the current app language
  const { lang, changeLang } = useContext(LangugeContext);

  // i18n hook to manage translations
  const { i18n } = useTranslation();

  // App Router hook to get the current path
  const pathname = usePathname();

  // When the app initializes or URL changes, set the initial language based on the URL or fallback
  useEffect(() => {
    const pathSegments = pathname?.split("/") || [];
    const urlLocale = pathSegments[1]; // 'en' or 'ta'

    let initialLang = CFG.default_lang;

    if (urlLocale === "ta") {
      initialLang = "ta-IN";
    } else if (urlLocale === "en") {
      initialLang = "en-US";
    } else {
      const Llanguage = LgetLang(); // Get the stored language from localStorage
      initialLang = Llanguage ? Llanguage : CFG.default_lang; // Get stored or default language
    }

    changeLang(initialLang as string); // Set the language context with the initial language value
  }, [changeLang, pathname]);

  // Effect hook to maintain language states for i18n
  useEffect(() => {
    if (lang) {
      // Change the language in the i18n library (React i18next)
      if (i18n.changeLanguage) {
        i18n.changeLanguage(lang); // Update the i18n language
      }

      const currentStoredLang = LgetLang();
      // If the current language is different from the stored one, update localStorage
      if (currentStoredLang !== lang) {
        LsetLang(lang); // Set the selected language in localStorage
      }
    }
  }, [lang, i18n]); // Run this effect when the `lang` or `i18n` changes

  // Return current language, function to change the language
  return { lang, changeLang };
};

export { useLang };
