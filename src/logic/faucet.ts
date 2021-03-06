import { Address } from "@iov/bcp";
import { TokenTicker } from "@iov/core";
import { IovFaucet } from "@iov/faucets";

// sends tokens from the faucet to the given identity
// expects full uri (eg. https://faucet.friendnet-slow.iov.one/faucet)
//
// TODO: add tests once there is a way to do so in local ci environment (not live testnet)
export function takeFaucetCredit(uri: string, recipient: Address, ticker: TokenTicker): Promise<void> {
  const faucet = new IovFaucet(uri);
  return faucet.credit(recipient, ticker);
}
