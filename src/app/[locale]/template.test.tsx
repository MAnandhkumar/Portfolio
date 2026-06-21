import React from "react";
import { render } from "@testing-library/react";
import Template from "./template";

describe("Template Component", () => {
  it("renders correctly", () => {
    const { container } = render(
      <Template>
        <div>Content</div>
      </Template>,
    );
    expect(container).toBeInTheDocument();
  });
});
