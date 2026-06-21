import { render, screen } from "@testing-library/react";

import About from "./About";

describe("About Component", () => {
  const mockDict = {
    title: "About Me Test",
    profileTitle: "Professional Profile Test",
    profileText: "This is a profile text sample.",
    strengthsTitle: "Key Strengths Test",
    strengths: ["Strength 1", "Strength 2"],
  };

  it("renders localized dictionary details correctly", () => {
    render(<About dict={mockDict} />);

    // Check titles and lists are rendered
    expect(screen.getByText("About Me Test")).toBeInTheDocument();
    expect(screen.getByText("Professional Profile Test")).toBeInTheDocument();
    expect(screen.getByText("This is a profile text sample.")).toBeInTheDocument();
    expect(screen.getByText("Key Strengths Test")).toBeInTheDocument();
    expect(screen.getByText("• Strength 1")).toBeInTheDocument();
    expect(screen.getByText("• Strength 2")).toBeInTheDocument();
  });
});
