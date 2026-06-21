import React from "react";
import { render, screen } from "@testing-library/react";
import ExperienceSection from "./Experience";

const mockDict = {
  title: "My Experience",
  jobs: [{ title: "Dev", company: "Tech Inc", period: "2022-2024", description: "Did coding." }],
};

describe("ExperienceSection", () => {
  it("renders correctly", () => {
    render(<ExperienceSection dict={mockDict} />);
    expect(screen.getByText("My Experience")).toBeInTheDocument();
    expect(screen.getByText("Dev")).toBeInTheDocument();
    expect(screen.getByText("Tech Inc")).toBeInTheDocument();
    expect(screen.getByText("2022-2024")).toBeInTheDocument();
    expect(screen.getByText("Did coding.")).toBeInTheDocument();
  });
});
