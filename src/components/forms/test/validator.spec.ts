import {
  greaterThan,
  greaterThanOrEqual,
  lowerThan,
  lowerThanOrEqual,
  maxDecimals,
  mustBeFloat,
  toValidFloat,
} from "../validator";

describe("Components -> Forms -> Validator", () => {
  describe("lowerThan validator", () => {
    it("should return error string if bigger", () => {
      const result = lowerThan(1)("2");
      expect(result).toEqual("Should be lower than 1");
    });

    it("should return error string if bigger", () => {
      const result = lowerThan(1)("2,1");
      expect(result).toEqual("Should be lower than 1");
    });

    it("should return error string if equal", () => {
      const result = lowerThan(1)("1");
      expect(result).toEqual("Should be lower than 1");
    });

    it("should return undefined if not a number", () => {
      const result = lowerThan(1)("not a number");
      expect(result).toBeUndefined();
    });

    it("should return undefined if number is lower", () => {
      const result = lowerThan(1)("0.9");
      expect(result).toBeUndefined();
    });
  });

  describe("lowerThanOrEqual validator", () => {
    it("should return error string if bigger", () => {
      const result = lowerThanOrEqual(1)("2");
      expect(result).toEqual("Should be lower or equal than 1");
    });

    it("should return error string if bigger", () => {
      const result = lowerThanOrEqual(1)("2,1");
      expect(result).toEqual("Should be lower or equal than 1");
    });

    it("should return undefined if equal", () => {
      const result = lowerThanOrEqual(1)("1");
      expect(result).toBeUndefined();
    });

    it("should return undefined if not a number", () => {
      const result = lowerThanOrEqual(1)("not a number");
      expect(result).toBeUndefined();
    });

    it("should return undefined if number is lower", () => {
      const result = lowerThanOrEqual(1)("0.9");
      expect(result).toBeUndefined();
    });
  });

  describe("greaterThan validator", () => {
    it("should return error string if lower", () => {
      const result = greaterThan(2)("1");
      expect(result).toEqual("Should be greater than 2");
    });

    it("should return error string if equal", () => {
      const result = greaterThan(2)("1,5");
      expect(result).toEqual("Should be greater than 2");
    });

    it("should return undefined if not a number", () => {
      const result = greaterThan(2)("not a number");
      expect(result).toBeUndefined();
    });

    it("should return undefined if number is lower", () => {
      const result = greaterThan(2)("3");
      expect(result).toBeUndefined();
    });
  });

  describe("greaterThanOrEqual validator", () => {
    it("should return error string if bigger", () => {
      const result = greaterThanOrEqual(2)("1");
      expect(result).toEqual("Should be greater or equal than 2");
    });

    it("should return error string if bigger", () => {
      const result = greaterThanOrEqual(2)("1,5");
      expect(result).toEqual("Should be greater or equal than 2");
    });

    it("should return undefined if equal", () => {
      const result = greaterThanOrEqual(2)("2");
      expect(result).toBeUndefined();
    });

    it("should return undefined if not a number", () => {
      const result = greaterThanOrEqual(2)("not a number");
      expect(result).toBeUndefined();
    });

    it("should return undefined if number is lower", () => {
      const result = greaterThanOrEqual(2)("3");
      expect(result).toBeUndefined();
    });
  });

  describe("toValidFloat helper", () => {
    it("should return NaN", () => {
      const result = toValidFloat("not number");
      expect(result).toBeNaN();
    });

    it("should return NaN if not valid number", () => {
      const result = toValidFloat("1.2.2");
      expect(result).toBeNaN();
    });

    it("should return number if valid float with dot", () => {
      const result = toValidFloat("1.2");
      expect(result).toBe(1.2);
    });

    it("should return number if valid float with comma", () => {
      const result = toValidFloat("1,2");
      expect(result).toBe(1.2);
    });
  });

  describe("mustBeFloat validator", () => {
    it("should return error string if string is not float", () => {
      const result = mustBeFloat("not float number");
      expect(result).toEqual("Must be a number");
    });

    it("should return undefined if string is float with dot", () => {
      const result = mustBeFloat("2.5");
      expect(result).toBeUndefined();
    });

    it("should return undefined if string is float with comma", () => {
      const result = mustBeFloat("2,5");
      expect(result).toBeUndefined();
    });
  });

  describe("maxDecimals validator", () => {
    it("should return error string if decimals more than required", () => {
      const result = maxDecimals(3)("1.5555");
      expect(result).toEqual("Too many decimal places was used. Max: 3");
    });

    it("should return undefined if decimals less or equal to required", () => {
      const result = maxDecimals(3)("1.555");
      expect(result).toBeUndefined();
    });

    it("should return undefined if decimal point with number after exists", () => {
      const result = maxDecimals(3)("1.");
      expect(result).toBeUndefined();
    });

    it("should return undefined even if extra trailing zeros", () => {
      const result = maxDecimals(2)("1.230000");
      expect(result).toBeUndefined();
    });
  });
});
