import { As } from "type-tagger";

import { Address, ChainId } from "@iov/bcp";
import { BnsConnection, BnsUsernameNft } from "@iov/bns";

import { getAddressByName } from "./account";

export type HumanReadableAddress = string & As<"human-readable-address">;

export const IOV_NAMESPACE = "*iov";

export function isHumanReadableAddress(address: string): address is HumanReadableAddress {
  if (!address) {
    return false;
  }

  return address.endsWith(IOV_NAMESPACE);
}

export async function resolveAddress(
  connection: BnsConnection,
  humanReadableAddress: HumanReadableAddress,
  chainId: ChainId,
): Promise<Address> {
  const username = humanReadableAddress.slice(0, -IOV_NAMESPACE.length);
  const address = await getAddressByName(connection, username, chainId);
  if (address === undefined) {
    throw new Error(`Value name ${humanReadableAddress} not registered`);
  }
  return address;
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
