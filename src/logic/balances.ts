import { Amount, TokenTicker } from "@iov/bcp-types";

// This parses a decimal as string into the Amount format
export function stringToAmount(amount: string, tokenTicker: TokenTicker): Amount {
  const matched = amount.match(/^([0-9]+)?([\.\,]([0-9]+))?$/);
  if (!matched) {
    throw new Error(`Not a valid number: ${amount}`);
  }
  // elements 1 and 3...
  const wholeString = matched[1];
  const fractionString = matched[3];
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
  const wholeDigits = quantity.length - fractionalDigits;
  const value = `${quantity.slice(0, wholeDigits)}.${quantity.slice(wholeDigits)} ${tokenTicker}`;
  return value;
}

// this takes an amount and trims off all trailing 0s
export function trimAmount(amount: Amount): Amount {
  const { quantity, fractionalDigits, tokenTicker } = amount;
  const zeros = quantity.match(/0*$/)![0].length;
  if (zeros === 0) {
    return amount;
  }
  const trimmedQuantity = quantity.slice(0, -zeros);
  const trimmedDigits = fractionalDigits - zeros;
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
