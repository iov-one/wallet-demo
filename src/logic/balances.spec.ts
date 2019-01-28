import { TokenTicker } from "@iov/bcp-types";

import { amountToString, makeAmount as makeInfo, padAmount, stringToAmount, trimAmount } from "./balances";

describe("amountToString", () => {
  const iov = "IOV" as TokenTicker;

  it("should handle whole numbers", () => {
    expect(amountToString(makeInfo("123", 0, iov))).toEqual("123 IOV");
    expect(amountToString(makeInfo("123000", 0, iov))).toEqual("123000 IOV");
  });

  it("should handle fractional", () => {
    expect(amountToString(makeInfo("123456", 2, iov))).toEqual("1234.56 IOV");
    expect(amountToString(makeInfo("123456", 4, iov))).toEqual("12.3456 IOV");
    expect(amountToString(makeInfo("123456", 6, iov))).toEqual("0.123456 IOV");
  });

  it("should handle odd formats", () => {
    // leading zeros
    expect(amountToString(makeInfo("00123", 2, iov))).toEqual("1.23 IOV");
    expect(amountToString(makeInfo("123456", 8, iov))).toEqual("0.00123456 IOV");
  });
});

describe("stringToAmount", () => {
  const eth = "ETH" as TokenTicker;

  it("should handle whole numbers", () => {
    expect(stringToAmount("1200", eth)).toEqual(makeInfo("1200", 0, eth));
    expect(stringToAmount("765", eth)).toEqual(makeInfo("765", 0, eth));
  });

  it("should handle fractional numbers with or without leading 0", () => {
    expect(stringToAmount("0.1234", eth)).toEqual(makeInfo("1234", 4, eth));
    expect(stringToAmount(".1234", eth)).toEqual(makeInfo("1234", 4, eth));
    expect(stringToAmount("0.023", eth)).toEqual(makeInfo("023", 3, eth));
  });

  it("should support , as separator", () => {
    expect(stringToAmount("0,1234", eth)).toEqual(makeInfo("1234", 4, eth));
    expect(stringToAmount("13,67", eth)).toEqual(makeInfo("1367", 2, eth));
    expect(stringToAmount(",00420", eth)).toEqual(makeInfo("0042", 4, eth));
  });

  it("should remove trailing zeros from fraction", () => {
    expect(stringToAmount("0,1230", eth)).toEqual(makeInfo("123", 3, eth));
    expect(stringToAmount("13.670", eth)).toEqual(makeInfo("1367", 2, eth));
    expect(stringToAmount("8,675", eth)).toEqual(makeInfo("8675", 3, eth));
    expect(stringToAmount(".00420", eth)).toEqual(makeInfo("0042", 4, eth));
  });

  it("should error on invalid strings", () => {
    expect(() => stringToAmount("12a", eth)).toThrow(/Not a valid number/);
    expect(() => stringToAmount("0x1234", eth)).toThrow(/Not a valid number/);
    expect(() => stringToAmount("-15.6", eth)).toThrow(/Not a valid number/);
    expect(() => stringToAmount("12.", eth)).toThrow(/Not a valid number/);
  });
});

describe("trimAmount", () => {
  const eth = "ETH" as TokenTicker;

  it("should trim trailing zeros", () => {
    expect(trimAmount(makeInfo("1200", 0, eth))).toEqual(makeInfo("1200", 0, eth));
    expect(trimAmount(makeInfo("1200", 2, eth))).toEqual(makeInfo("12", 0, eth));
    expect(trimAmount(makeInfo("120034000", 7, eth))).toEqual(makeInfo("120034", 4, eth));
    expect(trimAmount(makeInfo("3400", 1, eth))).toEqual(makeInfo("340", 0, eth));
  });
});

describe("padAmount", () => {
  const foo = "FOO" as TokenTicker;

  it("should expand the strings as needed", () => {
    expect(padAmount(makeInfo("12", 0, foo), 4)).toEqual(makeInfo("120000", 4, foo));
    expect(padAmount(makeInfo("1230", 2, foo), 4)).toEqual(makeInfo("123000", 4, foo));
    expect(padAmount(makeInfo("123456", 3, foo), 6)).toEqual(makeInfo("123456000", 6, foo));
    expect(padAmount(makeInfo("12003400", 6, foo), 6)).toEqual(makeInfo("12003400", 6, foo));
  });

  it("should error if not enough places", () => {
    expect(() => padAmount(makeInfo("1234", 4, foo), 2)).toThrow(/Want to pad/);
    expect(() => padAmount(makeInfo("120000", 4, foo), 3)).toThrow(/Want to pad/);
  });
});
