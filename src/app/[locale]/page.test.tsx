import React from "react";
import { render, screen } from "@testing-library/react";
import Page from "./page";

jest.mock("@/components/Home/Home", () => () => <div data-testid="mock-home" />);

describe("Page", () => {
  it("renders Home component", () => {
    render(<Page />);
    expect(screen.getByTestId("mock-home")).toBeInTheDocument();
  });
});
