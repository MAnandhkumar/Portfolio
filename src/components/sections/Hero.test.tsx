import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Hero from "./Hero";

const mockDict = {
  titlePrefix: "Hello",
  name: "John Doe",
  description: "I am a dev",
  btnContact: "Contact Me",
  btnLearn: "Learn More",
};

describe("Hero", () => {
  it("renders correctly", () => {
    render(<Hero scrollToSection={jest.fn()} dict={mockDict} />);
    expect(screen.getByText(/Hello/)).toBeInTheDocument();
    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("I am a dev")).toBeInTheDocument();
  });

  it("calls scrollToSection when buttons are clicked", () => {
    const mockScroll = jest.fn();
    render(<Hero scrollToSection={mockScroll} dict={mockDict} />);

    fireEvent.click(screen.getByText("Contact Me"));
    expect(mockScroll).toHaveBeenCalledWith("contact");

    fireEvent.click(screen.getByText("Learn More"));
    expect(mockScroll).toHaveBeenCalledWith("about");
  });

  it("calls scrollToSection when chevron is clicked", () => {
    const mockScroll = jest.fn();
    render(<Hero scrollToSection={mockScroll} dict={mockDict} />);

    const chevronBtn = screen.getByLabelText("Scroll down to About section");
    fireEvent.click(chevronBtn);
    expect(mockScroll).toHaveBeenCalledWith("about");
  });
});
