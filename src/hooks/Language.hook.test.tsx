import { renderHook } from "@testing-library/react";
import { useLang } from "./Language.hook";
import { LangugeContext } from "../languages/Language.context";
import { usePathname } from "next/navigation";
import { useTranslation } from "react-i18next";
import CFG from "../config/config.json";

const mockLgetLang = jest.fn();
const mockLsetLang = jest.fn();

jest.mock("next/navigation", () => ({
  usePathname: jest.fn(),
}));

jest.mock("react-i18next", () => ({
  useTranslation: jest.fn(),
}));

jest.mock("../utils/browserStorage", () => ({
  localStorageAccessor: jest.fn(() => [
    (...args: any[]) => mockLgetLang(...args),
    (...args: any[]) => mockLsetLang(...args),
    jest.fn(),
  ]),
}));

describe("useLang hook", () => {
  let mockChangeLang: jest.Mock;
  let mockI18nChangeLanguage: jest.Mock;

  beforeEach(() => {
    mockChangeLang = jest.fn();
    mockI18nChangeLanguage = jest.fn();
    mockLgetLang.mockReset();
    mockLsetLang.mockReset();

    (usePathname as jest.Mock).mockReturnValue("/en/about");
    (useTranslation as jest.Mock).mockReturnValue({
      i18n: { changeLanguage: mockI18nChangeLanguage },
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <LangugeContext.Provider value={{ lang: "en-US", changeLang: mockChangeLang }}>
      {children}
    </LangugeContext.Provider>
  );

  it("should initialize language based on ta URL", () => {
    (usePathname as jest.Mock).mockReturnValue("/ta/about");
    renderHook(() => useLang(), { wrapper });
    expect(mockChangeLang).toHaveBeenCalledWith("ta-IN");
  });

  it("should initialize language based on en URL", () => {
    (usePathname as jest.Mock).mockReturnValue("/en/about");
    renderHook(() => useLang(), { wrapper });
    expect(mockChangeLang).toHaveBeenCalledWith("en-US");
  });

  it("should fallback to localStorage if no matching locale in URL", () => {
    (usePathname as jest.Mock).mockReturnValue("/other/about");
    mockLgetLang.mockReturnValue("fr-FR");
    renderHook(() => useLang(), { wrapper });
    expect(mockChangeLang).toHaveBeenCalledWith("fr-FR");
  });

  it("should fallback to default config if no localStorage", () => {
    (usePathname as jest.Mock).mockReturnValue("/other/about");
    mockLgetLang.mockReturnValue(null);
    renderHook(() => useLang(), { wrapper });
    expect(mockChangeLang).toHaveBeenCalledWith(CFG.default_lang);
  });

  it("should update i18n and localStorage when lang changes", () => {
    mockLgetLang.mockReturnValue("fr-FR");
    renderHook(() => useLang(), { wrapper }); // lang in context is 'en-US'
    expect(mockI18nChangeLanguage).toHaveBeenCalledWith("en-US");
    expect(mockLsetLang).toHaveBeenCalledWith("en-US");
  });

  it("should not throw if i18n changeLanguage is missing", () => {
    (useTranslation as jest.Mock).mockReturnValue({
      i18n: {}, // No changeLanguage
    });
    mockLgetLang.mockReturnValue("en-US");
    renderHook(() => useLang(), { wrapper });
    expect(mockLsetLang).not.toHaveBeenCalled(); // same lang
  });
});
