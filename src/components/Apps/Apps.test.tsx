import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Apps from "./Apps";

jest.mock("../WeatherApp/WeatherApp", () => ({
  WeatherApp: () => <div>Real-time Weather App</div>,
}));

jest.mock("../Calculator/Calculator", () => ({
  __esModule: true,
  default: () => <div>AC</div>,
}));

describe("Apps Component", () => {
  it("renders default app and switches", () => {
    render(<Apps />);
    expect(screen.getByText("Real-time Weather App")).toBeInTheDocument();

    // Switch to Calculator
    fireEvent.click(screen.getByText("Advanced Calculator"));
    expect(screen.getByText("AC")).toBeInTheDocument(); // AC button from calculator
  });
});
