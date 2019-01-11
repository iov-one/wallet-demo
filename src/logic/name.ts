import { Address, TxReadCodec } from "@iov/bcp-types";
import { bnsCodec, BnsConnection } from "@iov/bns";

import { getAddressByName } from "./account";

const iovNamespace = "*iov";
export function isIovAddress(address: string): boolean {
  return address.endsWith(iovNamespace);
}

export async function resolveAddress(
  connection: BnsConnection,
  maybeAddress: string,
  codec: TxReadCodec = bnsCodec,
): Promise<Address> {
  if (isIovAddress(maybeAddress)) {
    const username = maybeAddress.slice(0, -iovNamespace.length);
    const address = await getAddressByName(connection, username);
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
