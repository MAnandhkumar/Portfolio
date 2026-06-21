import React from "react";
import { render } from "@testing-library/react";
import Home from "./Home";

describe("Home Component", () => {
  it("renders correctly", () => {
    const { container } = render(<Home />);
    expect(container).toBeInTheDocument();
  });
});
