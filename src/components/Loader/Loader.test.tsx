import React from "react";
import { render, screen } from "@testing-library/react";
import { Loader } from "./Loader";

jest.mock("next/image", () => ({
  __esModule: true,
  // eslint-disable-next-line @next/next/no-img-element
  default: (props: any) => <img {...props} alt="loader mock" data-testid="loader" />,
}));

describe("Loader", () => {
  it("renders null when fallback is false or undefined", () => {
    const { container } = render(<Loader />);
    expect(container.firstChild).toBeNull();
  });

  it("renders loader when fallback is true", () => {
    render(<Loader fallback={true} />);
    expect(screen.getByTestId("loader")).toBeInTheDocument();
  });
});
