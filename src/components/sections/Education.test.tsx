import React from "react";
import { render, screen } from "@testing-library/react";
import EducationSection from "./Education";

const mockDict = {
  title: "My Education",
  items: [{ degree: "BSc", institution: "University", period: "2020-2024", grade: "A" }],
};

describe("EducationSection", () => {
  it("renders correctly", () => {
    render(<EducationSection dict={mockDict} />);
    expect(screen.getByText("My Education")).toBeInTheDocument();
    expect(screen.getByText("BSc")).toBeInTheDocument();
    expect(screen.getByText("University")).toBeInTheDocument();
    expect(screen.getByText("2020-2024")).toBeInTheDocument();
    expect(screen.getByText("A")).toBeInTheDocument();
  });
});
