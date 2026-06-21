import React from "react";
import { render } from "@testing-library/react";
import AppsPage from "./page";

jest.mock("@/components/Apps/Apps", () => () => <div data-testid="mock-apps-page" />);

describe("Apps Page", () => {
  it("renders Apps component", () => {
    const { getByTestId } = render(<AppsPage />);
    expect(getByTestId("mock-apps-page")).toBeInTheDocument();
  });
});
