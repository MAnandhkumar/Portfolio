import React from "react";
import { render } from "@testing-library/react";
import Work from "./Work";

describe("Work Component", () => {
  it("renders correctly", () => {
    const { container } = render(<Work />);
    expect(container).toBeInTheDocument();
  });
});
