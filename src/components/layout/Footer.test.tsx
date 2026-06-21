import { render, screen } from "@testing-library/react";

import Footer from "./Footer";

describe("Footer Component", () => {
  it("renders copyrights text with the current year", () => {
    render(<Footer />);
    const currentYear = new Date().getFullYear().toString();

    // Validate text rendering
    expect(
      screen.getByText(new RegExp(`Anandhkumar. All rights reserved.`, "i")),
    ).toBeInTheDocument();
    expect(screen.getByText(new RegExp(currentYear))).toBeInTheDocument();
  });
});
