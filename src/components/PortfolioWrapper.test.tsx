import React from "react";
import { render, act } from "@testing-library/react";
import PortfolioWrapper from "./PortfolioWrapper";

jest.mock("@/components/layout/Navbar", () => ({ activeSection, scrollToSection }: any) => (
  <div data-testid="mock-navbar">
    <span data-testid="active-section">{activeSection}</span>
    <button data-testid="scroll-btn" onClick={() => scrollToSection("about")}>
      Scroll
    </button>
  </div>
));
jest.mock("@/components/layout/Footer", () => () => <div data-testid="mock-footer" />);
jest.mock("@/components/sections/Hero", () => () => <div data-testid="mock-hero" />);
jest.mock("@/components/sections/About", () => () => <div data-testid="mock-about" />);
jest.mock("@/components/sections/Skills", () => () => <div data-testid="mock-skills" />);
jest.mock("@/components/sections/Experience", () => () => <div data-testid="mock-experience" />);
jest.mock("@/components/sections/Education", () => () => <div data-testid="mock-education" />);
jest.mock("@/components/sections/Contact", () => () => <div data-testid="mock-contact" />);

describe("PortfolioWrapper", () => {
  beforeEach(() => {
    // Mock getElementById to return fake elements with offsets
    jest.spyOn(document, "getElementById").mockImplementation((id) => {
      return {
        offsetTop: id === "about" ? 500 : 0,
        offsetHeight: id === "about" ? 500 : 0,
        getBoundingClientRect: () => ({ top: 100 }),
      } as any;
    });
    jest.spyOn(window, "scrollTo").mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("renders all sections and layouts", () => {
    const mockDictionary = {
      nav: {},
      hero: {},
      about: {},
      skills: {},
      experience: {},
      education: {},
      contact: {},
    };
    const { getByTestId } = render(<PortfolioWrapper dictionary={mockDictionary} locale="en" />);

    expect(getByTestId("mock-navbar")).toBeInTheDocument();
    expect(getByTestId("mock-footer")).toBeInTheDocument();

    // Simulate scroll to trigger handleScroll
    act(() => {
      Object.defineProperty(window, "scrollY", { value: 400, writable: true });
      window.dispatchEvent(new Event("scroll"));
    });

    // Check if active section changed
    expect(getByTestId("active-section").textContent).toBe("about");

    // Trigger scrollToSection
    act(() => {
      getByTestId("scroll-btn").click();
    });
    expect(window.scrollTo).toHaveBeenCalled();
  });
});
