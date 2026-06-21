import { encryptData, decryptData } from "./encryption";
import CryptoJS from "crypto-js";

// Mock config to ensure tests don't break if config changes
jest.mock("../config/config.json", () => ({
  encryption_key: "test_secret_key",
}));

describe("Encryption Utilities", () => {
  const testData = "Hello, World!";

  it("should encrypt data and return a string with an HMAC", () => {
    const encrypted = encryptData(testData);
    expect(typeof encrypted).toBe("string");
    expect(encrypted).toContain(":");
  });

  it("should decrypt properly formatted encrypted data", () => {
    const encrypted = encryptData(testData);
    const decrypted = decryptData(encrypted);
    expect(decrypted).toBe(testData);
  });

  it("should throw an error for invalid encrypted data format (no colon)", () => {
    expect(() => decryptData("invalidDataWithoutColon")).toThrow("Invalid encrypted data format");
  });

  it("should throw an error if HMAC data integrity check fails", () => {
    const encrypted = encryptData(testData);
    const [encString] = encrypted.split(":");
    // Provide a valid format but wrong HMAC
    expect(() => decryptData(`${encString}:wrong_hmac`)).toThrow("Data integrity check failed");
  });

  it("should throw an error if decryption results in empty value", () => {
    // Mock CryptoJS AES decrypt to return empty
    const spy = jest
      .spyOn(CryptoJS.AES, "decrypt")
      .mockImplementationOnce(() => CryptoJS.enc.Utf8.parse(""));
    const encrypted = encryptData(testData);
    expect(() => decryptData(encrypted)).toThrow("Decryption failed - empty result");
    spy.mockRestore();
  });
});
