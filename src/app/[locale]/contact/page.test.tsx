import React from "react";
import { render } from "@testing-library/react";
import ContactPage from "./page";

jest.mock("@/components/Contact/Contact", () => () => <div data-testid="mock-contact-page" />);

describe("Contact Page", () => {
  it("renders Contact component", () => {
    const { getByTestId } = render(<ContactPage />);
    expect(getByTestId("mock-contact-page")).toBeInTheDocument();
  });
});
