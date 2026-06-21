import React from "react";
import { render, screen } from "@testing-library/react";
import Skills from "./Skills";

const mockDict = {
  title: "My Skills",
};

describe("Skills", () => {
  it("renders correctly", () => {
    render(<Skills dict={mockDict} />);
    expect(screen.getByText("My Skills")).toBeInTheDocument();
    expect(screen.getByText("React.js")).toBeInTheDocument();
    expect(screen.getByText("Redux")).toBeInTheDocument();
    expect(screen.getByText("Ant Design")).toBeInTheDocument();
    expect(screen.getByText("Bootstrap")).toBeInTheDocument();
    expect(screen.getByText("jQuery")).toBeInTheDocument();
    expect(screen.getByText("TypeScript")).toBeInTheDocument();
    expect(screen.getByText("JavaScript")).toBeInTheDocument();
    expect(screen.getByText("HTML")).toBeInTheDocument();
    expect(screen.getByText("CSS")).toBeInTheDocument();
    expect(screen.getByText("SCSS")).toBeInTheDocument();
  });
});
