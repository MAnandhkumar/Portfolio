import i18next from "./i18";

describe("i18next configuration", () => {
  it("should be initialized and configured", () => {
    expect(i18next).toBeDefined();
    // Verify that useSuspense is set in the react configuration
    expect(i18next.options.react?.useSuspense).toBe(true);
  });
});
