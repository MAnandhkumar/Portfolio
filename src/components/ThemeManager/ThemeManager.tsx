import React, { useState, createContext, useCallback, useEffect, useMemo } from "react";
import { localStorageAccessor } from "../../utils/browserStorage";
import {
  ThemesType,
  ThemeContextProps,
  ThemeManagerProps,
  GeneralThemeType,
  CSSVariables,
  ConfigKeyType,
} from "./ThemeManagerTypes";

const DEFAULT_ALGORITHM = "light";
const DEFAULT_THEME: ThemesType = "default";
const LOCALSTORAGE_VAR = "theme";

export const ThemeContext = createContext<ThemeContextProps>({
  selectedTheme: DEFAULT_THEME,
  themeAlgorithm: DEFAULT_ALGORITHM,
  setSelectedTheme: () => {},
  setThemeAlgorithm: () => {},
});

// Theme state management
const [LgetCurrentTheme, LsetCurrentTheme] = localStorageAccessor<ThemesType>(
  LOCALSTORAGE_VAR,
  DEFAULT_THEME,
);

const ThemeManager: React.FC<ThemeManagerProps> = ({ children }) => {
  // Removed document direction logic, now handled in layout.tsx

  // Load themes
  const [generalThemes] = useState<GeneralThemeType>(() => {
    return {
      default: {} as ConfigKeyType,
      dark: {} as ConfigKeyType,
      BW: {} as ConfigKeyType,
      BY: {} as ConfigKeyType,
      YB: {} as ConfigKeyType,
      fonts: {} as CSSVariables,
    };
  });

  const [selectedTheme, setSelectedTheme] = useState<ThemesType>(DEFAULT_THEME);
  const [isHydrated, setIsHydrated] = useState(false);

  // Hydrate from localStorage after mount
  useEffect(() => {
    const storedTheme = LgetCurrentTheme();
    if (storedTheme) {
      setSelectedTheme(storedTheme);
    }
    setIsHydrated(true);
  }, []);

  const [themeAlgorithm, setThemeAlgorithm] = useState<string>(DEFAULT_ALGORITHM);

  // Since airline themes are removed, mergedThemes is just generalThemes
  const mergedThemes = useMemo(() => {
    return generalThemes;
  }, [generalThemes]);

  // Update CSS variables
  const updateCSSVariables = useCallback((config: CSSVariables) => {
    const root = document.documentElement;
    Object.entries(config).forEach(([property, value]) => {
      root.style.setProperty(property, value);
    });
  }, []);

  // Apply theme changes
  useEffect(() => {
    if (!mergedThemes) return;

    const currentTheme = mergedThemes[selectedTheme];
    if (!currentTheme) return;

    const newAlgorithm = currentTheme.algorithm || DEFAULT_ALGORITHM;
    setThemeAlgorithm(newAlgorithm);

    // Apply tailwind dark class
    if (newAlgorithm === "dark" || selectedTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    // Apply custom variables
    if (currentTheme.custom) {
      updateCSSVariables(currentTheme.custom);
    }

    // Apply fonts
    if (mergedThemes.fonts) {
      updateCSSVariables(mergedThemes.fonts);
    }

    // Save to localStorage (only if hydrated)
    if (isHydrated) {
      LsetCurrentTheme(selectedTheme);
    }
  }, [mergedThemes, selectedTheme, updateCSSVariables, isHydrated]);

  const contextValue = useMemo(
    () => ({
      selectedTheme,
      setSelectedTheme: (theme: ThemesType) => {
        setSelectedTheme(theme);
        LsetCurrentTheme(theme);
      },
      themeAlgorithm,
      setThemeAlgorithm,
    }),
    [selectedTheme, themeAlgorithm],
  );

  return <ThemeContext.Provider value={contextValue}>{children}</ThemeContext.Provider>;
};

export default ThemeManager;
