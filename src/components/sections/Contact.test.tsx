import React from "react";
import { render, screen } from "@testing-library/react";
import Contact from "./Contact";

const mockDict = {
  title: "Contact Me",
  emailLabel: "Email",
  locationLabel: "Location",
  locationValue: "Earth",
  socialLabel: "Socials",
};

describe("Contact", () => {
  it("renders correctly", () => {
    render(<Contact dict={mockDict} />);
    expect(screen.getByText("Contact Me")).toBeInTheDocument();
    expect(screen.getByText("Email")).toBeInTheDocument();
    expect(screen.getByText("Location")).toBeInTheDocument();
    expect(screen.getByText("Earth")).toBeInTheDocument();
    expect(screen.getByText("Socials")).toBeInTheDocument();
    expect(screen.getByText("manandhk007@gmail.com")).toBeInTheDocument();
  });
});
