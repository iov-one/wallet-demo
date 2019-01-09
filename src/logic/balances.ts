import { Amount } from "@iov/bcp-types";

export function stringToFractional(fractionString: string, sigFigs: number): number {
  // we ensure no more than sigFigs are parsed
  const cleanFrac = fractionString.slice(0, sigFigs);
  return parseInt(cleanFrac.padEnd(sigFigs, "0"), 10);
}

export function fractionalToString(fractional: number, sigFigs: number, rtim?: boolean): string {
  const fraction = fractional.toString().padStart(sigFigs, "0");
  if (fraction.length > sigFigs) {
    throw new Error("Number too large for the given sigFigs");
  }
  if (!rtim) {
    const [, trailingZeros] = fraction.match(/(0*)$/)!;
    if (trailingZeros !== "") {
      return fraction.slice(0, -trailingZeros.length);
    }  
  }
  return fraction;
}

export interface CoinInfo {
  readonly whole: number;
  readonly fractional: number;
  readonly sigFigs: number;
}

export function stringToCoin(amount: string, sigFigs: number): CoinInfo {
  const matched = amount.match(/^([0-9]+)?([\.\,]([0-9]+))?$/);
  if (!matched) {
    throw new Error(`Not a valid number: ${amount}`);
  }
  // elements 1 and 3...
  const wholeString = matched[1];
  const fractionString = matched[3];
  const whole = wholeString ? parseInt(wholeString, 10) : 0;
  const fractional = fractionString ? stringToFractional(fractionString, sigFigs) : 0;
  return { whole, fractional, sigFigs };
}

export function coinToString(coin: CoinInfo, rtrim?: boolean): string {
  if (coin.fractional < 0 || coin.whole < 0) {
    throw new Error("Coin value must be non-negative");
  }
  if (coin.fractional === 0) {
    return `${coin.whole}` + "".padEnd(coin.sigFigs, "0");
  }
  const fractionString = fractionalToString(coin.fractional, coin.sigFigs, rtrim);
  return `${coin.whole}.${fractionString}`;
}

export function buildAmount(coin: CoinInfo, tokenTicker: string): Amount {
  if (coin.fractional < 0 || coin.whole < 0) {
    throw new Error("Coin value must be non-negative");
  }
  const quantity = coin.whole === 0 ? coin.fractional.toString() : coinToString(coin, true).replace(".", "");

  return {
    quantity: quantity,
    fractionalDigits: coin.sigFigs,
    tokenTicker: tokenTicker,
  } as Amount;
}

export function stringifyAmount(amount: Amount): string {
  const whole = amount.quantity.slice(0, -amount.fractionalDigits) || "0";
  let fractional = amount.quantity.slice(-amount.fractionalDigits) || "0";
  const [, trailingZeros] = fractional.match(/(0*)$/)!;
  console.log(`trailingZeros: ${trailingZeros} - fractional: ${fractional}`);
  if (trailingZeros !== "") {
    fractional = fractional.slice(0, -trailingZeros.length);
  }
  if (fractional === "") {
    return `${whole} ${amount.tokenTicker}`;
  }
  return `${whole}.${fractional} ${amount.tokenTicker}`;
}