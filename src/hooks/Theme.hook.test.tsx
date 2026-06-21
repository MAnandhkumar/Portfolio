import React from "react";
import { renderHook, act } from "@testing-library/react";
import { useTheming } from "./Theme.hook";
import { ThemeContext } from "../components/ThemeManager/ThemeManager";

describe("useTheming hook", () => {
  it("should return selectedTheme and changeTheme", () => {
    const mockSetSelectedTheme = jest.fn();
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <ThemeContext.Provider
        value={{
          selectedTheme: "dark",
          themeAlgorithm: "default",
          setThemeAlgorithm: jest.fn(),
          setSelectedTheme: mockSetSelectedTheme,
        }}
      >
        {children}
      </ThemeContext.Provider>
    );

    const { result } = renderHook(() => useTheming(), { wrapper });

    expect(result.current.selectedTheme).toBe("dark");

    act(() => {
      result.current.changeTheme("default");
    });

    expect(mockSetSelectedTheme).toHaveBeenCalledWith("default");
  });
});
