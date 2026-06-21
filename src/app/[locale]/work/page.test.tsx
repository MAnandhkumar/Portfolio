import React from "react";
import { render } from "@testing-library/react";
import WorkPage from "./page";

jest.mock("@/components/Work/Work", () => () => <div data-testid="mock-work-page" />);

describe("Work Page", () => {
  it("renders Work component", () => {
    const { getByTestId } = render(<WorkPage />);
    expect(getByTestId("mock-work-page")).toBeInTheDocument();
  });
});
