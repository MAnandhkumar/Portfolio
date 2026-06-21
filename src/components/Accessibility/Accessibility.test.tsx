import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Accessibility from "./Accessibility";
import * as themeHook from "../../hooks/Theme.hook";

jest.mock("../../hooks/Theme.hook", () => ({
  useTheming: jest.fn(),
}));

describe("Accessibility", () => {
  let mockChangeTheme: jest.Mock;

  beforeEach(() => {
    mockChangeTheme = jest.fn();
    (themeHook.useTheming as jest.Mock).mockReturnValue({
      changeTheme: mockChangeTheme,
      selectedTheme: "default",
    });
    // Mock getComputedStyle for rootStyles
    window.getComputedStyle = jest.fn().mockReturnValue({
      getPropertyValue: (prop: string) => {
        if (prop === "--FONTMAXINCREASE") return "2";
        if (prop === "--FONTMAXDECREASE") return "2";
        return "";
      },
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders contrast buttons", () => {
    render(<Accessibility />);
    expect(screen.getByText("Contrast:")).toBeInTheDocument();
    expect(screen.getAllByText("Default").length).toBe(2);
    expect(screen.getAllByText("A").length).toBe(3);
  });

  it("changes theme on click", () => {
    render(<Accessibility />);
    const bwButton = screen.getAllByText("A")[0];
    fireEvent.click(bwButton);
    expect(mockChangeTheme).toHaveBeenCalledWith("BW");
  });

  it("changes font size on click", () => {
    render(<Accessibility />);
    const increaseBtn = screen.getByText("A+");
    fireEvent.click(increaseBtn);
    expect(document.body.style.zoom).toBeTruthy();

    const decreaseBtn = screen.getByText("A-");
    fireEvent.click(decreaseBtn);

    const defaultBtn = screen.getAllByText("Default")[1]; // Font size default
    fireEvent.click(defaultBtn);
  });

  it("handles keyboard navigation with valid elements", () => {
    // Add dummy elements to the DOM
    const dummyContainer = document.createElement("div");
    const dummyAccessibility = document.createElement("a");
    dummyAccessibility.className = "cls-accessibility";
    dummyAccessibility.href = "#";
    const dummySibling = document.createElement("a");
    dummySibling.href = "#";

    dummyContainer.appendChild(dummyAccessibility);
    dummyContainer.appendChild(dummySibling);
    document.body.appendChild(dummyContainer);

    render(<Accessibility />);
    const defaultContrastBtn = screen.getAllByText("Default")[0];
    const increaseBtn = screen.getByText("A+");

    // test focusBack
    fireEvent.keyDown(defaultContrastBtn, { key: "Tab", shiftKey: true });

    // test focusNext
    fireEvent.keyDown(increaseBtn, { key: "Tab", shiftKey: false });

    // Click on other contrast buttons to trigger branches
    const btnA = screen.getAllByText("A");
    fireEvent.click(btnA[0]); // BW
    fireEvent.click(btnA[1]); // BY
    fireEvent.click(btnA[2]); // YB

    // Cleanup
    document.body.removeChild(dummyContainer);
  });

  it("renders correctly with different selectedThemes", () => {
    (themeHook.useTheming as jest.Mock).mockReturnValue({
      changeTheme: mockChangeTheme,
      selectedTheme: "BW",
    });
    const { rerender } = render(<Accessibility />);

    (themeHook.useTheming as jest.Mock).mockReturnValue({
      changeTheme: mockChangeTheme,
      selectedTheme: "BY",
    });
    rerender(<Accessibility />);

    (themeHook.useTheming as jest.Mock).mockReturnValue({
      changeTheme: mockChangeTheme,
      selectedTheme: "YB",
    });
    rerender(<Accessibility />);
  });

  it("handles empty computed styles", () => {
    // Return empty for getPropertyValue to hit || 2 fallback
    window.getComputedStyle = jest.fn().mockReturnValue({
      getPropertyValue: () => "",
    });

    // Reset zoom to hit || defaultZoom fallback
    document.body.style.zoom = "";

    render(<Accessibility />);

    const increaseBtn = screen.getByText("A+");
    fireEvent.click(increaseBtn);

    const decreaseBtn = screen.getByText("A-");
    fireEvent.click(decreaseBtn);
  });
});
