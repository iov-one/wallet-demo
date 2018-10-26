export interface CoinInfo {
  readonly whole: number;
  readonly fractional: number;
  readonly sigFigs: number;
}

export function stringToFractional(fractionString: string, sigFigs: number): number {
  // we ensure no more than sigFigs are parsed
  const cleanFrac = fractionString.slice(0, sigFigs);
  return parseInt(cleanFrac.padEnd(sigFigs, "0"), 10);
}

export function fractionalToString(fractional: number, sigFigs: number): string {
  return fractional.toString().padStart(sigFigs, "0");
}

export function stringToCoin(amount: string, sigFigs: number): CoinInfo {
  const matched = amount.match(/^([0-9]+)?(.([0-9]+))?$/);
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

export function coinToString(coin: CoinInfo): string {
  if (coin.fractional < 0 || coin.whole < 0) {
    throw new Error("Coin value must be non-negative");
  }
  if (coin.fractional === 0) {
    return `${coin.whole}`;
  }
  const fractionString = fractionalToString(coin.fractional, coin.sigFigs);
  return `${coin.whole}.${fractionString}`;
}
