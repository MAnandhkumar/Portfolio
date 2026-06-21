import { getDictionary } from "./dictionaries";

jest.mock("server-only", () => ({}));

describe("Dictionaries", () => {
  it("fetches en dictionary", async () => {
    const dict = await getDictionary("en");
    // Using actual dictionary structure
    expect(dict.nav).toBeDefined();
  });

  it("fetches ta dictionary", async () => {
    const dict = await getDictionary("ta");
    expect(dict.nav).toBeDefined();
  });

  it("falls back to en dictionary for invalid locale", async () => {
    const dict = await getDictionary("fr");
    expect(dict.nav).toBeDefined();
  });
});
