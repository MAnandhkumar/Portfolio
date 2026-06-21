import React from "react";
import { render } from "@testing-library/react";
import ProjectsPage from "./page";

jest.mock("@/components/Projects/Projects", () => () => <div data-testid="mock-projects-page" />);

describe("Projects Page", () => {
  it("renders Projects component", () => {
    const { getByTestId } = render(<ProjectsPage />);
    expect(getByTestId("mock-projects-page")).toBeInTheDocument();
  });
});
