import React, { useContext } from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { LanguageProvider, LangugeContext } from "./Language.context";
import CFG from "@/config/config.json";

// Mock react-i18next I18nextProvider
jest.mock("react-i18next", () => ({
  I18nextProvider: ({ children }: any) => <div data-testid="i18n-provider">{children}</div>,
}));

// Mock i18 setup so it doesn't try to load things during test
jest.mock("./i18", () => ({}), { virtual: true });

describe("LanguageContext", () => {
  it("should provide default language from context initially without provider", () => {
    const TestComponent = () => {
      const { lang, changeLang } = useContext(LangugeContext);
      // Call changeLang to cover the default empty method
      changeLang("anything");
      return <div data-testid="default-lang">{lang}</div>;
    };
    render(<TestComponent />);
    expect(screen.getByTestId("default-lang").textContent).toBe(CFG.default_lang);
  });

  it("provides default language and changes language correctly", async () => {
    const TestComponent = () => {
      const { lang, changeLang } = useContext(LangugeContext);
      return (
        <div>
          <span data-testid="lang-display">{lang}</span>
          <button onClick={() => changeLang("ta-IN")}>Change</button>
        </div>
      );
    };

    render(
      <LanguageProvider>
        <TestComponent />
      </LanguageProvider>,
    );

    expect(screen.getByTestId("lang-display").textContent).toBe(CFG.default_lang);

    fireEvent.click(screen.getByRole("button", { name: "Change" }));

    expect(screen.getByTestId("lang-display").textContent).toBe("ta-IN");
  });

  it("does not update state if language is the same", async () => {
    const TestComponent = () => {
      const { lang, changeLang } = useContext(LangugeContext);
      return (
        <div>
          <span data-testid="lang-display">{lang}</span>
          <button onClick={() => changeLang(CFG.default_lang)}>Change Same</button>
        </div>
      );
    };

    render(
      <LanguageProvider>
        <TestComponent />
      </LanguageProvider>,
    );

    fireEvent.click(screen.getByRole("button", { name: "Change Same" }));
    expect(screen.getByTestId("lang-display").textContent).toBe(CFG.default_lang);
  });
});
