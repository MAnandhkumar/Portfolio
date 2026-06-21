import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Header from "./Header";
import { useRouter, usePathname } from "next/navigation";
import * as themeHook from "../../hooks/Theme.hook";
import * as langHook from "../../hooks/Language.hook";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
  usePathname: jest.fn(),
}));

jest.mock("react-i18next", () => ({
  useTranslation: () => ({ t: (key: string, fallback: string) => fallback }),
}));

jest.mock("../../hooks/Theme.hook", () => ({
  useTheming: jest.fn(),
}));

jest.mock("../../hooks/Language.hook", () => ({
  useLang: jest.fn(),
}));

describe("Header", () => {
  let mockPush: jest.Mock;
  let mockChangeTheme: jest.Mock;
  let mockChangeLang: jest.Mock;

  beforeEach(() => {
    mockPush = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
    (usePathname as jest.Mock).mockReturnValue("/");

    mockChangeTheme = jest.fn();
    (themeHook.useTheming as jest.Mock).mockReturnValue({
      changeTheme: mockChangeTheme,
      selectedTheme: "default",
    });

    mockChangeLang = jest.fn();
    (langHook.useLang as jest.Mock).mockReturnValue({
      changeLang: mockChangeLang,
      lang: "en-US",
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders navigation links", () => {
    render(<Header />);
    expect(screen.getAllByText("Home").length).toBeGreaterThan(0);
    expect(screen.getAllByText("About").length).toBeGreaterThan(0);
  });

  it("toggles mobile menu", () => {
    render(<Header />);
    const menuBtn = screen.getByRole("button", { name: "Open main menu" });

    // Initially menu shouldn't have mobile links visible
    // They are hidden by conditional rendering.
    fireEvent.click(menuBtn);
    expect(screen.getAllByText("Home").length).toBe(2); // desktop + mobile

    fireEvent.click(menuBtn); // close
  });

  it("toggles theme", () => {
    render(<Header />);
    const themeBtn = screen.getAllByRole("button", { name: "Toggle Dark Mode" })[0];
    fireEvent.click(themeBtn);
    expect(mockChangeTheme).toHaveBeenCalledWith("dark");
  });

  it("toggles language", () => {
    render(<Header />);
    const langBtn = screen.getAllByRole("button", { name: "Toggle Language" })[0];
    fireEvent.click(langBtn);
    expect(mockChangeLang).toHaveBeenCalledWith("ta-IN");
    expect(mockPush).toHaveBeenCalledWith("/ta");
  });

  it("toggles language back to en", () => {
    (langHook.useLang as jest.Mock).mockReturnValue({
      changeLang: mockChangeLang,
      lang: "ta-IN",
    });
    render(<Header />);
    const langBtn = screen.getAllByRole("button", { name: "Toggle Language" })[0];
    fireEvent.click(langBtn);
    expect(mockChangeLang).toHaveBeenCalledWith("en-US");
    expect(mockPush).toHaveBeenCalledWith("/en");
  });

  it("handles logo click", () => {
    render(<Header />);
    const logo = screen.getByAltText("logo");
    fireEvent.click(logo);
    expect(mockPush).toHaveBeenCalledWith("/");
  });

  it("toggles mobile menu", () => {
    render(<Header />);
    const menuBtn = screen.getByRole("button", { name: /open main menu/i });
    fireEvent.click(menuBtn);

    const mobileAbout = screen.getAllByText("About")[1]; // Second one is mobile
    expect(mobileAbout).toBeInTheDocument();

    // Click again to close
    fireEvent.click(menuBtn);
  });

  it("changes language and handles different pathnames", () => {
    // 1. With '/en/about'
    (usePathname as jest.Mock).mockReturnValue("/en/about");
    const { rerender } = render(<Header />);

    const langBtns = screen.getAllByRole("button", { name: /toggle language/i });
    fireEvent.click(langBtns[0]); // Mobile lang button
    expect(mockPush).toHaveBeenCalledWith("/ta/about"); // toggles to ta

    // 2. With '/'
    (usePathname as jest.Mock).mockReturnValue("/");
    rerender(<Header />);
    fireEvent.click(langBtns[1]); // Desktop lang button
    expect(mockPush).toHaveBeenCalled();
  });

  it("toggles dark mode", () => {
    render(<Header />);
    const themeBtns = screen.getAllByRole("button", { name: /toggle dark mode/i });
    fireEvent.click(themeBtns[0]); // Mobile
    fireEvent.click(themeBtns[1]); // Desktop
  });

  it("renders correctly in dark mode", () => {
    (themeHook.useTheming as jest.Mock).mockReturnValue({
      changeTheme: mockChangeTheme,
      selectedTheme: "dark",
    });
    render(<Header />);
    // Should render Sun icons
    const themeBtns = screen.getAllByRole("button", { name: /toggle dark mode/i });
    expect(themeBtns.length).toBeGreaterThan(0);
  });
});
