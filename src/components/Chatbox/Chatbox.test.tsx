import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import ChatBox from "./Chatbox";

describe("ChatBox", () => {
  beforeAll(() => {
    window.HTMLElement.prototype.scrollIntoView = jest.fn();
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  it("renders FAB initially", () => {
    render(<ChatBox />);
    expect(screen.getByRole("button", { name: "Toggle chat" })).toBeInTheDocument();
  });

  it("opens chat drawer when FAB is clicked", () => {
    render(<ChatBox />);
    const fab = screen.getByRole("button", { name: "Toggle chat" });
    fireEvent.click(fab);

    expect(screen.getByText("Virtual Assistant")).toBeInTheDocument();
  });

  it("handles FAQ option click", () => {
    render(<ChatBox />);
    fireEvent.click(screen.getByRole("button", { name: "Toggle chat" }));

    // Virtual assistant greeting
    expect(screen.getByText(/Hello! I am/i)).toBeInTheDocument();

    // Click an FAQ
    const faqBtn = screen.getByText("What is your professional summary?");
    fireEvent.click(faqBtn);

    // User message should appear
    expect(screen.getAllByText("What is your professional summary?").length).toBeGreaterThan(1);

    // Wait for AI response
    act(() => {
      jest.advanceTimersByTime(1000);
    });

    // AI message should appear
    expect(screen.getByText(/I am a results-driven Software Engineer/i)).toBeInTheDocument();
  });
});
