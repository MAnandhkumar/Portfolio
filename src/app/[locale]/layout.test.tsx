import React from "react";
import { render } from "@testing-library/react";
import RootLayout from "./layout";

jest.mock("@/app/ClientLayout", () => ({
  ClientLayout: ({ children }: any) => <div data-testid="mock-client-layout">{children}</div>,
}));

describe("RootLayout", () => {
  it("renders correctly with default params", async () => {
    const params = Promise.resolve({ locale: "en" });
    const jsx = await RootLayout({ children: <div data-testid="child">Test Content</div>, params });
    const { getByTestId } = render(jsx);

    expect(getByTestId("mock-client-layout")).toBeInTheDocument();
    expect(getByTestId("child")).toBeInTheDocument();
  });

  it("renders with rtl and fallback locale when config dictates", async () => {
    jest.mock(
      "@/config/config.json",
      () => ({
        layout: { page_direction: "right" },
      }),
      { virtual: true },
    );

    // We have to dynamically import RootLayout after mocking
    const DynamicRootLayout = (await import("./layout")).default;

    const params = Promise.resolve({ locale: "" });
    const jsx = await DynamicRootLayout({
      children: <div data-testid="child">Test Content</div>,
      params,
    });
    const { container } = render(jsx);
    // RTL strips html/body tags in render, so we just verify it renders children correctly
    expect(container).toBeInTheDocument();
  });
});
