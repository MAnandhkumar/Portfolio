import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import Navbar from "./Navbar";
import { useRouter, usePathname } from "next/navigation";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
  usePathname: jest.fn(),
}));

describe("Navbar", () => {
  let mockPush: jest.Mock;
  const mockScrollToSection = jest.fn();
  const mockDict = {
    about: "About",
    skills: "Skills",
    experience: "Experience",
    education: "Education",
    contact: "Contact",
  };

  beforeEach(() => {
    mockPush = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
    (usePathname as jest.Mock).mockReturnValue("/en/about");
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.useRealTimers();
  });

  it("renders navbar links", () => {
    render(
      <Navbar
        activeSection="about"
        scrollToSection={mockScrollToSection}
        dict={mockDict}
        locale="en"
      />,
    );
    expect(screen.getAllByText("About").length).toBeGreaterThan(0);
  });

  it("scrolls to section on click", () => {
    render(
      <Navbar
        activeSection="about"
        scrollToSection={mockScrollToSection}
        dict={mockDict}
        locale="en"
      />,
    );
    const aboutBtns = screen.getAllByText("About");
    fireEvent.click(aboutBtns[0]);
    expect(mockScrollToSection).toHaveBeenCalledWith("about");
  });

  it("toggles mobile menu", () => {
    render(
      <Navbar
        activeSection="about"
        scrollToSection={mockScrollToSection}
        dict={mockDict}
        locale="en"
      />,
    );
    const menuBtn = screen.getByRole("button", { name: "Toggle menu" });
    fireEvent.click(menuBtn);

    // Mobile menu items
    const mobileAbout = screen.getAllByText("About")[1];
    fireEvent.click(mobileAbout);
    expect(mockScrollToSection).toHaveBeenCalledWith("about");
  });

  it("changes language from desktop dropdown", () => {
    render(
      <Navbar
        activeSection="about"
        scrollToSection={mockScrollToSection}
        dict={mockDict}
        locale="en"
      />,
    );
    const langBtn = screen.getByRole("button", { name: "Switch language" });
    fireEvent.click(langBtn);

    const taBtn = screen.getByText("தமிழ் (Tamil)");
    fireEvent.click(taBtn);

    expect(mockPush).toHaveBeenCalledWith("/ta/about");
  });

  it("changes language from mobile toggle", () => {
    render(
      <Navbar
        activeSection="about"
        scrollToSection={mockScrollToSection}
        dict={mockDict}
        locale="en"
      />,
    );
    const langToggle = screen.getByRole("button", { name: "Toggle language" });
    fireEvent.click(langToggle);

    expect(mockPush).toHaveBeenCalledWith("/ta/about");
  });

  it("handles typing animation and locale change", () => {
    const { rerender } = render(
      <Navbar
        activeSection="about"
        scrollToSection={mockScrollToSection}
        dict={mockDict}
        locale="en"
      />,
    );
    act(() => {
      jest.advanceTimersByTime(4000); // 300ms * 9 chars = 2700ms minimum to reach end
    });
    // Simulate reverse typing
    act(() => {
      jest.advanceTimersByTime(2000);
    });

    // Change locale to trigger prevLocale branch
    rerender(
      <Navbar
        activeSection="about"
        scrollToSection={mockScrollToSection}
        dict={mockDict}
        locale="ta"
      />,
    );
  });

  it("renders ta locale dropdown correctly", () => {
    render(
      <Navbar
        activeSection="about"
        scrollToSection={mockScrollToSection}
        dict={mockDict}
        locale="ta"
      />,
    );
    const langBtn = screen.getByRole("button", { name: "Switch language" });
    fireEvent.click(langBtn);
    const taSpan = screen.getByText("தமிழ் (Tamil)");
    expect(taSpan.closest("button")).toHaveClass("text-[#ff3b7c]");
  });

  it("closes language dropdown on outside click", () => {
    render(
      <Navbar
        activeSection="about"
        scrollToSection={mockScrollToSection}
        dict={mockDict}
        locale="en"
      />,
    );
    const langBtn = screen.getByRole("button", { name: "Switch language" });
    fireEvent.click(langBtn);
    expect(screen.getByText("English")).toBeInTheDocument();

    // Click outside
    fireEvent.mouseDown(document.body);
    // Dropdown should be closed (English text won't be in document)
    expect(screen.queryByText("English")).not.toBeInTheDocument();
  });

  it("handles scroll events", () => {
    render(
      <Navbar
        activeSection="about"
        scrollToSection={mockScrollToSection}
        dict={mockDict}
        locale="en"
      />,
    );

    act(() => {
      Object.defineProperty(window, "scrollY", { value: 100, writable: true });
      window.dispatchEvent(new Event("scroll"));
    });

    // Scrolled state should change background opacity (we can just verify it doesn't crash)

    act(() => {
      Object.defineProperty(window, "scrollY", { value: 0, writable: true });
      window.dispatchEvent(new Event("scroll"));
    });
  });
});
