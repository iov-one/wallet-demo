// tslint:disable:no-unused-expression
import { expect } from "chai";
import "mocha";

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
    expect(coinToString(coinInfo({ whole: 123 }))).to.equal("123");
    expect(coinToString(coinInfo({ whole: 100200300 }))).to.equal("100200300");
  });

  it("should handle only fractional", () => {
    expect(coinToString(coinInfo({ fractional: 123, sigFigs: 3 }))).to.equal("0.123");
    expect(coinToString(coinInfo({ fractional: 100400, sigFigs: 8 }))).to.equal("0.00100400");
  });

  it("should handle only whole and fractional", () => {
    expect(coinToString(coinInfo({ whole: 678, fractional: 12, sigFigs: 3 }))).to.equal("678.012");
  });
});

describe("stringToCoin", () => {
  it("should handle whole numbers", () => {
    expect(stringToCoin("1200", 4)).to.deep.equal(makeInfo(1200, 0, 4));
    expect(stringToCoin("765", 20)).to.deep.equal(makeInfo(765, 0, 20));
  });

  it("should handle fractional numbers with or without leading 0", () => {
    expect(stringToCoin("0.1234", 5)).to.deep.equal(makeInfo(0, 12340, 5));
    expect(stringToCoin(".1234", 5)).to.deep.equal(makeInfo(0, 12340, 5));
    expect(stringToCoin("0.23", 8)).to.deep.equal(makeInfo(0, 23000000, 8));
  });

  it("should error on invalid strings", () => {
    expect(() => stringToCoin("12a", 4)).to.throw(/Not a valid number/);
    expect(() => stringToCoin("13,67", 4)).to.throw(/Not a valid number/);
    expect(() => stringToCoin("0x1234", 4)).to.throw(/Not a valid number/);
    expect(() => stringToCoin("-15.6", 4)).to.throw();
    expect(() => stringToCoin("12.", 6)).to.throw();
  });
});
