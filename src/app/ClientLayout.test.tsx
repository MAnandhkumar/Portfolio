import React from "react";
import { render, screen } from "@testing-library/react";
import { ClientLayout } from "./ClientLayout";

jest.mock("@/components/Header/Header", () => () => <div data-testid="mock-header" />);
jest.mock("@/components/Chatbox/Chatbox", () => () => <div data-testid="mock-chatbox" />);
jest.mock("@/app/Providers", () => ({
  Providers: ({ children }: any) => <div data-testid="mock-providers">{children}</div>,
}));

describe("ClientLayout", () => {
  it("renders correctly", () => {
    render(
      <ClientLayout>
        <div>Test Content</div>
      </ClientLayout>,
    );
    expect(screen.getByTestId("mock-header")).toBeInTheDocument();
    expect(screen.getByTestId("mock-chatbox")).toBeInTheDocument();
    expect(screen.getByTestId("mock-providers")).toBeInTheDocument();
    expect(screen.getByText("Test Content")).toBeInTheDocument();
    expect(screen.getAllByAltText("Profile").length).toBe(2);
  });
});
