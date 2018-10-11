import { Address } from "@iov/bcp-types";
import { TokenTicker } from "@iov/core";
import { BovFaucet } from "@iov/faucets";

export function takeFaucetCredit(
    uri: string,
    recipient: Address,
    ticker?: TokenTicker,
  ): Promise<void> {
  const bovFaucet = new BovFaucet(uri);
  return bovFaucet.credit(recipient, ticker);
}