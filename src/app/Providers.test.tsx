import React from "react";
import { render } from "@testing-library/react";
import { Providers } from "./Providers";

describe("Providers Component", () => {
  it("renders correctly", () => {
    const { container } = render(
      <Providers>
        <div>Content</div>
      </Providers>,
    );
    expect(container).toBeInTheDocument();
  });
});
