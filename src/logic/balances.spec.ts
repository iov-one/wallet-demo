import { Amount, TokenTicker } from "@iov/bcp-types";

import { amountToString, stringToAmount } from "./balances";

const makeInfo = (quantity: string, fractionalDigits: number, tokenTicker: TokenTicker): Amount => ({
  quantity,
  fractionalDigits,
  tokenTicker,
});

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
    // TODO: less than sigfigs
    // expect(amountToString(makeInfo("123456", 8, iov))).toEqual("0.00123456 IOV");
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
    expect(stringToAmount(",00420", eth)).toEqual(makeInfo("00420", 5, eth));
  });

  it("should error on invalid strings", () => {
    expect(() => stringToAmount("12a", eth)).toThrow(/Not a valid number/);
    expect(() => stringToAmount("0x1234", eth)).toThrow(/Not a valid number/);
    expect(() => stringToAmount("-15.6", eth)).toThrow(/Not a valid number/);
    expect(() => stringToAmount("12.", eth)).toThrow(/Not a valid number/);
  });
});
