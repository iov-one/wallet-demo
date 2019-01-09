import { Amount, TokenTicker } from "@iov/bcp-types";

// This parses a decimal as string into the Amount format
export function stringToAmount(amount: string, tokenTicker: TokenTicker): Amount {
  // we don't match leading zeros in whole quantity
  const matched = amount.match(/^0*([0-9]+)?([\.\,]([0-9]+))?$/);
  if (!matched) {
    throw new Error(`Not a valid number: ${amount}`);
  }
  // elements 1 and 3...
  const wholeString = matched[1] || "";
  const fractionString = matched[3] || "";
  const quantity = `${wholeString}${fractionString}`;
  const fractionalDigits = fractionString.length;
  return { quantity, fractionalDigits, tokenTicker };
}

// This produces a human readable format of the amount, value and token ticker
export function amountToString(amount: Amount): string {
  const { quantity, fractionalDigits, tokenTicker } = amount;
  if (!quantity.match(/^[0-9]+$/)) {
    throw new Error(`quantity must be a number, got ${quantity}`);
  }
  if (fractionalDigits < 0) {
    throw new Error(`invalid fractional digits: ${fractionalDigits}`);
  }

  if (fractionalDigits > quantity.length) {
    // TODO: left pad if length is shorter
    throw new Error("TODO");
  }
  const cut = quantity.length - fractionalDigits;
  const whole = cut === 0 ? "0" : quantity.slice(0, cut);
  const decimal = fractionalDigits === 0 ? "" : `.${quantity.slice(cut)}`;
  const value = `${whole}${decimal} ${tokenTicker}`;
  return value;
}

// this takes an amount and trims off all trailing 0s
// TODO: remove leading 0s also
export function trimAmount(amount: Amount): Amount {
  const { quantity, fractionalDigits, tokenTicker } = amount;
  const zeros = quantity.match(/0*$/)![0].length;
  const cut = Math.min(zeros, fractionalDigits);
  if (cut === 0) {
    return amount;
  }
  const trimmedQuantity = quantity.slice(0, -cut);
  const trimmedDigits = fractionalDigits - cut;
  return {
    quantity: trimmedQuantity,
    fractionalDigits: trimmedDigits,
    tokenTicker,
  };
}

// this takes an amount and pad 0s to the desired fractionalDigits, or throws error if fractionalDigits is already larger
export function padAmount(amount: Amount, desiredDigits: number): Amount {
  const { quantity, fractionalDigits, tokenTicker } = amount;
  const diff = desiredDigits - fractionalDigits;
  if (diff < 0) {
    throw new Error(`Want to pad to ${desiredDigits}, but already has ${fractionalDigits}`);
  } else if (diff === 0) {
    return amount;
  } else {
    const newQuantity = quantity + "0".repeat(diff);
    return {
      quantity: newQuantity,
      fractionalDigits: desiredDigits,
      tokenTicker,
    };
  }
}

// compareAmount returns 1 is a is bigger, -1 if b is bigger, 0 is the same value
// it throws an error if they have different tickers
export function compareAmounts(a: Amount, b: Amount): number {
  if (a.tokenTicker !== b.tokenTicker) {
    throw new Error(`Cannot compare ${a.tokenTicker} with ${b.tokenTicker}`);
  }
  // same number of fractional digits
  const maxDigits = Math.max(a.fractionalDigits, b.fractionalDigits);
  const { quantity: first } = padAmount(trimAmount(a), maxDigits);
  const { quantity: second } = padAmount(trimAmount(b), maxDigits);

  // longer number is bigger
  if (first.length > second.length) {
    return 1;
  } else if (first.length < second.length) {
    return -1;
  } else if (first === second) {
    // string compare if same length
    return 0;
  } else if (first > second) {
    return 1;
  } else {
    return -1;
  }
}
