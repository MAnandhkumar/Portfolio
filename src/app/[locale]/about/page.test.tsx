import React from "react";
import { render } from "@testing-library/react";
import AboutPage from "./page";

jest.mock("@/components/About/About", () => () => <div data-testid="mock-about-page" />);

describe("About Page", () => {
  it("renders About component", () => {
    const { getByTestId } = render(<AboutPage />);
    expect(getByTestId("mock-about-page")).toBeInTheDocument();
  });
});
