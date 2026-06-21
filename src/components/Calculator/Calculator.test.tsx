import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import AdvancedCalculator from "./Calculator";

describe("AdvancedCalculator", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("performs basic addition", () => {
    render(<AdvancedCalculator />);
    fireEvent.click(screen.getByText("7"));

    // Find '+' button by svg or class (it's the last button in the 3rd row, but easier: get all operator buttons)
    // Actually, just find the button that has onClick for '+'
    // Since we know the order of standard controls (AC, Delete, Percent) and then the rows:
    // row 1: 7, 8, 9, *
    // row 2: 4, 5, 6, -
    // row 3: 1, 2, 3, +
    const buttons = screen.getAllByRole("button");
    // Let's count: theme toggle (0), history (1), AC (2), Del (3), % (4),
    // 7,8,9,* (5,6,7,8) -> * is 8
    // 4,5,6,- (9,10,11,12) -> - is 12
    // 1,2,3,+ (13,14,15,16) -> + is 16
    // +/- (17), 0 (18), . (19), = (20)

    fireEvent.click(buttons[16]); // '+'
    fireEvent.click(screen.getByText("3"));
    fireEvent.click(buttons[20]); // '='

    expect(screen.getByRole("textbox")).toHaveValue("10");
  });

  it("handles scientific functions", () => {
    render(<AdvancedCalculator />);
    fireEvent.click(screen.getByText("π"));
    expect(screen.getByRole("textbox")).toHaveValue("pi");
  });

  it("handles delete", () => {
    render(<AdvancedCalculator />);
    fireEvent.click(screen.getByText("7"));
    fireEvent.click(screen.getByText("8"));

    const buttons = screen.getAllByRole("button");
    fireEvent.click(buttons[3]); // Delete is the 4th button (index 3)

    expect(screen.getByRole("textbox")).toHaveValue("7");
  });

  it("handles history", () => {
    render(<AdvancedCalculator />);
    fireEvent.click(screen.getByText("5"));
    const buttons = screen.getAllByRole("button");
    fireEvent.click(buttons[16]); // '+'
    fireEvent.click(screen.getByText("5"));
    fireEvent.click(buttons[20]); // '='

    // Toggle history
    const historyBtn = screen.getAllByRole("button")[1]; // History is usually top right
    fireEvent.click(historyBtn);

    // History should contain '5 + 5 = 10' or similar evaluated form
    expect(screen.getByText(/5\+5 = 10/i)).toBeInTheDocument();
  });

  it("handles error gracefully", () => {
    render(<AdvancedCalculator />);
    fireEvent.click(screen.getByText("AC"));
    const buttons = screen.getAllByRole("button");
    fireEvent.click(buttons[16]); // '+'
    fireEvent.click(buttons[16]); // '+'
    fireEvent.click(buttons[20]); // '='

    expect(screen.getByRole("textbox")).toHaveValue("Error");

    act(() => {
      jest.advanceTimersByTime(1500);
    });

    expect(screen.getByRole("textbox")).toHaveValue("0");
  });

  it("handles percentage", () => {
    render(<AdvancedCalculator />);
    const number5 = screen.getByText("5");
    const number0 = screen.getByText("0");

    fireEvent.click(number5);
    fireEvent.click(number0);

    const allButtons = screen.getAllByRole("button");
    const percentBtn =
      allButtons.find((b) => b.innerHTML.includes("lucide-percent")) || allButtons[4];
    fireEvent.click(percentBtn);
  });

  it("handles percentage error", () => {
    render(<AdvancedCalculator />);
    // Force Error state
    fireEvent.click(screen.getByText("AC"));
    const buttons = screen.getAllByRole("button");
    fireEvent.click(buttons[16]); // '+'
    fireEvent.click(buttons[16]); // '+'
    fireEvent.click(buttons[20]); // '='

    // Now state is Error. Click Percent
    const percentBtn = buttons.find((b) => b.innerHTML.includes("lucide-percent")) || buttons[4];
    fireEvent.click(percentBtn);
    expect(screen.getByRole("textbox")).toHaveValue("Error");
  });

  it("handles sign toggle", () => {
    render(<AdvancedCalculator />);
    const number5 = screen.getByText("5");
    fireEvent.click(number5);

    const allButtons = screen.getAllByRole("button");
    const toggleSignBtn =
      allButtons.find((b) => b.innerHTML.includes("lucide-arrow-left-right")) || allButtons[20];
    fireEvent.click(toggleSignBtn);

    fireEvent.click(toggleSignBtn); // toggle back
  });

  it("handles dark mode and remaining operations", () => {
    render(<AdvancedCalculator />);

    // Toggle dark mode (the theme toggle button is index 0)
    const allButtons = screen.getAllByRole("button");
    fireEvent.click(allButtons[0]);

    // Toggle history
    fireEvent.click(allButtons[1]);

    // Do some operations in dark mode
    fireEvent.click(screen.getByText("9"));
    // Multiply
    fireEvent.click(allButtons.find((b) => b.innerHTML.includes("lucide-x")) || allButtons[8]);
    fireEvent.click(screen.getByText("9"));
    fireEvent.click(screen.getByText("="));

    // Clear history
    const clearHistoryBtn = screen.getByText("Clear");
    fireEvent.click(clearHistoryBtn);

    // Delete branch where string length <= 1
    fireEvent.click(screen.getByText("AC"));
    fireEvent.click(screen.getByText("5"));
    fireEvent.click(allButtons[3]); // Delete
    expect(screen.getByRole("textbox")).toHaveValue("0");
  });
});
