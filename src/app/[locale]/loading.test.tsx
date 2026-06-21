import React from "react";
import { render } from "@testing-library/react";
import LoadingPage from "./loading";

describe("Loading Page", () => {
  it("renders correctly", () => {
    const { container } = render(<LoadingPage />);
    expect(container).toBeInTheDocument();
  });
});
