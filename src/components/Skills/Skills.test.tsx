import React from "react";
import { render } from "@testing-library/react";
import Skills from "./Skills";

describe("Skills Component", () => {
  it("renders correctly", () => {
    const { container } = render(<Skills />);
    expect(container).toBeInTheDocument();
  });
});
