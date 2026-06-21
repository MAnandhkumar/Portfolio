import React from "react";
import { render } from "@testing-library/react";
import SkillsPage from "./page";

jest.mock("@/components/Skills/Skills", () => () => <div data-testid="mock-skills-page" />);

describe("Skills Page", () => {
  it("renders Skills component", () => {
    const { getByTestId } = render(<SkillsPage />);
    expect(getByTestId("mock-skills-page")).toBeInTheDocument();
  });
});
