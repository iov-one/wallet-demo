import { Address, ChainId, TxReadCodec } from "@iov/bcp-types";
import { BnsConnection, BnsUsernameNft } from "@iov/bns";

import { getAddressByName } from "./account";

export const IOV_NAMESPACE = "*iov";
export function isIovAddress(address: string): boolean {
  if (!address) {
    return false;
  }

  return address.endsWith(IOV_NAMESPACE);
}

export async function resolveAddress(
  connection: BnsConnection,
  maybeAddress: string,
  chainId: ChainId,
  codec: TxReadCodec,
): Promise<Address> {
  if (isIovAddress(maybeAddress)) {
    const username = maybeAddress.slice(0, -IOV_NAMESPACE.length);
    const address = await getAddressByName(connection, username, chainId);
    if (address === undefined) {
      throw new Error(`Value name ${maybeAddress} not registered`);
    }

    return address;
  }

  if (!codec.isValidAddress(maybeAddress)) {
    throw new Error(`Invalid address for chain ${connection.chainId()}: ${maybeAddress}`);
  }

  return maybeAddress as Address;
}

export async function getUsernameNftByChainAddress(
  connection: BnsConnection,
  chain: ChainId,
  address: Address,
): Promise<BnsUsernameNft | undefined> {
  const usernames = await connection.getUsernames({ chain, address });
  return usernames[0];
}

export async function getUsernameNftByUsername(
  connection: BnsConnection,
  username: string,
): Promise<BnsUsernameNft | undefined> {
  const usernames = await connection.getUsernames({ username });
  return usernames[0];
}
