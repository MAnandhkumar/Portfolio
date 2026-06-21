import {
  localStorageInstance,
  sessionStorageInstance,
  localStorageAccessor,
  sessionStorageAccessor,
} from "./browserStorage";
import * as encryption from "./encryption";

jest.mock("./encryption", () => ({
  encryptData: jest.fn((data) => `encrypted_${data}`),
  decryptData: jest.fn((data) => {
    if (data.startsWith("encrypted_")) {
      return data.replace("encrypted_", "");
    }
    return data;
  }),
}));

describe("BrowserStorage", () => {
  beforeEach(() => {
    localStorage.clear();
    sessionStorage.clear();
    jest.clearAllMocks();
  });

  it("should set and get items (localStorage)", () => {
    localStorageInstance.setItem("testKey", "testValue");
    expect(localStorageInstance.getItem("testKey")).toBe("testValue");
  });

  it("should handle JSON items (sessionStorage)", () => {
    const obj = { name: "test" };
    sessionStorageInstance.setItem("objKey", obj);
    expect(sessionStorageInstance.getItem("objKey")).toEqual(obj);
  });

  it("should remove item", () => {
    localStorageInstance.setItem("remKey", "value");
    localStorageInstance.removeItem("remKey");
    expect(localStorageInstance.getItem("remKey")).toBeNull();
  });

  it("should clear storage", () => {
    localStorageInstance.setItem("key1", "val1");
    localStorageInstance.clear();
    expect(localStorageInstance.getItem("key1")).toBeNull();
  });

  it("should return null for non-existent item", () => {
    expect(localStorageInstance.getItem("nonExistentKey")).toBeNull();
  });

  it("should throw error when setting item with empty key", () => {
    expect(() => localStorageInstance.setItem("", "value")).toThrow(
      "Invalid key: Key must not be empty",
    );
  });

  describe("Error handling", () => {
    let consoleSpy: jest.SpyInstance;

    beforeEach(() => {
      consoleSpy = jest.spyOn(console, "error").mockImplementation(() => {});
    });

    afterEach(() => {
      consoleSpy.mockRestore();
      jest.restoreAllMocks();
    });

    it("should catch and log error on setItem", () => {
      jest.spyOn(Storage.prototype, "setItem").mockImplementationOnce(() => {
        throw new Error("storage error");
      });
      localStorageInstance.setItem("errKey", "val");
      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining("Error setting storage value"),
        expect.any(Error),
      );
    });

    it("should catch and log error on removeItem", () => {
      jest.spyOn(Storage.prototype, "removeItem").mockImplementationOnce(() => {
        throw new Error("storage error");
      });
      localStorageInstance.removeItem("errKey");
      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining("Error removing storage value"),
        expect.any(Error),
      );
    });

    it("should catch and log error on clear", () => {
      jest.spyOn(Storage.prototype, "clear").mockImplementationOnce(() => {
        throw new Error("storage error");
      });
      localStorageInstance.clear();
      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining("Error clearing storage"),
        expect.any(Error),
      );
    });

    it("should catch and log error on getItem encryption failure", () => {
      jest.spyOn(Storage.prototype, "getItem").mockReturnValueOnce("mock_encrypted_value");
      // By throwing in decryptData, we hit the catch block in getItem
      (encryption.decryptData as jest.Mock).mockImplementationOnce(() => {
        throw new Error("decrypt error");
      });

      expect(localStorageInstance.getItem("errKey")).toBeNull();
      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining("Failed to get item"),
        expect.any(Error),
      );
    });
  });

  describe("Accessor functions", () => {
    it("should create getter, setter, remover", () => {
      const [getVal, setVal, removeVal] = localStorageAccessor<string>("accKey");
      setVal("val");
      expect(getVal()).toBe("val");
      removeVal();
      expect(getVal()).toBeNull();
    });

    it("should initialize with default value if not set", () => {
      const [getVal] = sessionStorageAccessor<string>("defKey", "default");
      expect(getVal()).toBe("default");
    });

    it("should not overwrite existing value with default", () => {
      sessionStorageInstance.setItem("existingKey", "existing");
      const [getVal] = sessionStorageAccessor<string>("existingKey", "default");
      expect(getVal()).toBe("existing");
    });
    it("should remove data successfully", () => {
      const [, , removeData] = localStorageAccessor("test_key", "default_val");
      const mockRemoveItem = jest.spyOn(Storage.prototype, "removeItem");
      removeData();
      expect(mockRemoveItem).toHaveBeenCalledWith("APP_test_key");
    });

    it("should handle removeItem error gracefully", () => {
      const [, , removeData] = localStorageAccessor("test_key", "default_val");
      jest.spyOn(Storage.prototype, "removeItem").mockImplementation(() => {
        throw new Error("Remove error");
      });
      const consoleSpy = jest.spyOn(console, "error").mockImplementation();

      expect(() => removeData()).not.toThrow();
      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining("Error removing storage value"),
        expect.any(Error),
      );
    });
  });
});
