import React from "react";
import { render, act } from "@testing-library/react";
import DelayedSuspense from "./DelayedSuspense";

describe("DelayedSuspense", () => {
  it("renders correctly", () => {
    jest.useFakeTimers();
    render(
      <DelayedSuspense fallback={<div>Loading</div>}>
        <div>Content</div>
      </DelayedSuspense>,
    );
    act(() => {
      jest.advanceTimersByTime(2000);
    });
    jest.useRealTimers();
  });
});
