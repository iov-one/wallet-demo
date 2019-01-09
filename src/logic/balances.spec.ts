import { Amount, TokenTicker } from "@iov/bcp-types";

import { buildAmount, CoinInfo, coinToString, stringifyAmount, stringToCoin } from "./balances";

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

const makeAmount = (quantity: string, fractionalDigits: number, tokenTicker: TokenTicker): Amount => ({
  quantity,
  fractionalDigits,
  tokenTicker,
});


describe("coinToString", () => {
  it("should handle only whole", () => {
    expect(coinToString(coinInfo({ whole: 123, sigFigs: 5}))).toEqual("12300000");
    expect(coinToString(coinInfo({ whole: 100200300, sigFigs: 2 }))).toEqual("10020030000");
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
    expect(coinToString(coinInfo({ whole: 12, fractional: 345600, sigFigs: 9 }))).toEqual("12.0003456");
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

describe("buildAmount", () => {
  it("can buildAmount amount from only whole", () => {
    expect(buildAmount(makeInfo(1, 0, 3), "TST")).toEqual({
      quantity: "1000",
      fractionalDigits: 3,
      tokenTicker: "TST" as TokenTicker,
    });
    expect(buildAmount(makeInfo(1234, 0, 9), "TST")).toEqual({
      quantity: "1234000000000",
      fractionalDigits: 9,
      tokenTicker: "TST" as TokenTicker,
    });
  });
  it("can buildAmount amount from only fractional", () => {
    expect(buildAmount(makeInfo(0, 1, 3), "TST")).toEqual({
      quantity: "1",
      fractionalDigits: 3,
      tokenTicker: "TST" as TokenTicker,
    });
    expect(buildAmount(makeInfo(0, 1234, 9), "TST")).toEqual({
      quantity: "1234",
      fractionalDigits: 9,
      tokenTicker: "TST" as TokenTicker,
    });
  });
  it("can buildAmount amount from whole and fractional", () => {
    expect(buildAmount(makeInfo(1, 1, 9), "TST")).toEqual({
      quantity: "1000000001",
      fractionalDigits: 9,
      tokenTicker: "TST" as TokenTicker,
    });
    expect(buildAmount(makeInfo(12, 3456, 9), "TST")).toEqual({
      quantity: "12000003456",
      fractionalDigits: 9,
      tokenTicker: "TST" as TokenTicker,
    });
    expect(buildAmount(makeInfo(12, 345600, 9), "TST")).toEqual({
      quantity: "12000345600",
      fractionalDigits: 9,
      tokenTicker: "TST" as TokenTicker,
    });
  });
});

describe("stringifyAmount", () => {
  it("can stringifyAmount with only whole", () => {
    expect(stringifyAmount(makeAmount("1234000000000", 9, "TST" as TokenTicker))).toEqual("1234 TST");
  });
  it("can stringifyAmount with only fractional", () => {
    expect(stringifyAmount(makeAmount("123400000", 9, "TST" as TokenTicker))).toEqual("0.1234 TST");
  });
  it("can stringifyAmount with whole and fractional", () => {
    expect(stringifyAmount(makeAmount("12340000000", 9, "TST" as TokenTicker))).toEqual("12.34 TST");
  });
});
