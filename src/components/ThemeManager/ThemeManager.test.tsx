import React, { useContext } from "react";
import { render, screen, act } from "@testing-library/react";
import ThemeManager, { ThemeContext } from "./ThemeManager";

const mockLgetCurrentTheme = jest.fn();
const mockLsetCurrentTheme = jest.fn();

jest.mock("../../utils/browserStorage", () => ({
  localStorageAccessor: jest.fn(() => [
    (...args: any[]) => mockLgetCurrentTheme(...args),
    (...args: any[]) => mockLsetCurrentTheme(...args),
    jest.fn(),
  ]),
}));

const TestComponent = () => {
  const { selectedTheme, setSelectedTheme, themeAlgorithm } = useContext(ThemeContext);
  return (
    <div>
      <span data-testid="theme">{selectedTheme}</span>
      <span data-testid="algorithm">{themeAlgorithm}</span>
      <button onClick={() => setSelectedTheme("dark")}>Set Dark</button>
      <button onClick={() => setSelectedTheme("BW")}>Set BW</button>
    </div>
  );
};

describe("ThemeManager", () => {
  beforeEach(() => {
    mockLgetCurrentTheme.mockReset();
    mockLsetCurrentTheme.mockReset();
    document.documentElement.classList.remove("dark");
  });

  it("hydrates theme from localStorage", () => {
    mockLgetCurrentTheme.mockReturnValue("dark");
    render(
      <ThemeManager>
        <TestComponent />
      </ThemeManager>,
    );
    expect(screen.getByTestId("theme")).toHaveTextContent("dark");
    expect(document.documentElement.classList.contains("dark")).toBe(true);
  });

  it("allows setting a new theme", () => {
    mockLgetCurrentTheme.mockReturnValue("default");
    render(
      <ThemeManager>
        <TestComponent />
      </ThemeManager>,
    );
    expect(screen.getByTestId("theme")).toHaveTextContent("default");

    act(() => {
      screen.getByText("Set Dark").click();
    });

    expect(screen.getByTestId("theme")).toHaveTextContent("dark");
    expect(mockLsetCurrentTheme).toHaveBeenCalledWith("dark");
    expect(document.documentElement.classList.contains("dark")).toBe(true);
  });
});
