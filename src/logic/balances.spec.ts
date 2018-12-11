import { CoinInfo, coinToString, stringToCoin } from "./balances";

const coinInfo = (info: Partial<CoinInfo>): CoinInfo => ({
  whole: info.whole || 0,
  fractional: info.fractional || 0,
  sigFigs: info.sigFigs || 9,
});

const makeInfo = (whole: number, fractional: number, sigFigs: number): CoinInfo => ({
  whole,
  fractional,
  sigFigs,
});

describe("coinToString", () => {
  it("should handle only whole", () => {
    expect(coinToString(coinInfo({ whole: 123 }))).toEqual("123");
    expect(coinToString(coinInfo({ whole: 100200300 }))).toEqual("100200300");
  });

  it("should handle only fractional", () => {
    expect(coinToString(coinInfo({ fractional: 123, sigFigs: 3 }))).toEqual("0.123");
    expect(coinToString(coinInfo({ fractional: 456, sigFigs: 6 }))).toEqual("0.000456");
    // trimming off trailing 0's
    expect(coinToString(coinInfo({ fractional: 100400, sigFigs: 8 }))).toEqual("0.001004");
    expect(coinToString(coinInfo({ fractional: 4560000, sigFigs: 7 }))).toEqual("0.456");
  });

  it("should handle only whole and fractional", () => {
    expect(coinToString(coinInfo({ whole: 678, fractional: 12, sigFigs: 3 }))).toEqual("678.012");
  });
});

describe("stringToCoin", () => {
  it("should handle whole numbers", () => {
    expect(stringToCoin("1200", 4)).toEqual(makeInfo(1200, 0, 4));
    expect(stringToCoin("765", 20)).toEqual(makeInfo(765, 0, 20));
  });

  it("should handle fractional numbers with or without leading 0", () => {
    expect(stringToCoin("0.1234", 5)).toEqual(makeInfo(0, 12340, 5));
    expect(stringToCoin(".1234", 5)).toEqual(makeInfo(0, 12340, 5));
    expect(stringToCoin("0.23", 8)).toEqual(makeInfo(0, 23000000, 8));
  });

  it("should support , as separator", () => {
    expect(stringToCoin("0,1234", 5)).toEqual(makeInfo(0, 12340, 5));
    expect(stringToCoin("13,67", 4)).toEqual(makeInfo(13, 6700, 4));
    expect(stringToCoin(",42", 3)).toEqual(makeInfo(0, 420, 3));
  });

  it("should error on invalid strings", () => {
    expect(() => stringToCoin("12a", 4)).toThrow(/Not a valid number/);
    expect(() => stringToCoin("0x1234", 4)).toThrow(/Not a valid number/);
    expect(() => stringToCoin("-15.6", 4)).toThrow(/Not a valid number/);
    expect(() => stringToCoin("12.", 6)).toThrow(/Not a valid number/);
  });
});
