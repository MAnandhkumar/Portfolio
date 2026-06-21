import React from "react";
import { render } from "@testing-library/react";
import ErrorPage from "./error";

describe("Error Page", () => {
  it("renders correctly", () => {
    const error = new Error("Test error");
    const reset = jest.fn();
    const { container } = render(<ErrorPage error={error} reset={reset} />);
    expect(container).toBeInTheDocument();
  });
});
