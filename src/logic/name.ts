import { Address, BcpConnection, TxReadCodec } from "@iov/bcp-types";
import { bnsCodec } from "@iov/bns";

import { getAddressByName } from "./account";

const valueNameSuffix = "*iov";

// this just checks for valid ending on the string
export function isValueName(address: string): boolean {
  return address.endsWith(valueNameSuffix);
}

// you can call resolve address on the result from the ui to get a
export async function resolveAddress(
  connection: BcpConnection,
  maybeAddress: string,
  codec: TxReadCodec = bnsCodec,
): Promise<Address> {
  if (isValueName(maybeAddress)) {
    // we trim off the "*iov" suffix at the end to get the name to query
    const name = maybeAddress.slice(0, -valueNameSuffix.length);
    const address = await getAddressByName(connection, name);
    if (address === undefined) {
      throw new Error(`Value name ${maybeAddress} not registered`);
    } else {
      return address;
    }
  } else {
    if (!codec.isValidAddress(maybeAddress)) {
      throw new Error(`Invalid address for chain ${connection.chainId()}: ${maybeAddress}`);
    }
    return maybeAddress as Address;
  }
}
