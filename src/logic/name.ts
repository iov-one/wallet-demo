import { Address, BcpConnection } from "@iov/bcp-types";
import { getAddressByName } from "./account";

const valueNameSuffix = "*iov";

// this just checks for valid ending on the string
export function isValueName(address: string): boolean {
  return address.endsWith(valueNameSuffix);
}

// you can call resolve address on the result from the ui to get a
export async function resolveAddress(connection: BcpConnection, maybeAddress: string): Promise<Address> {
  if (isValueName(maybeAddress)) {
    // we trim off the "*iov" suffix at the end to get the name to query
    const name = maybeAddress.slice(0, -valueNameSuffix.length);
    const address = await getAddressByName(connection, name);
    if (address === undefined) {
      throw new Error(`Value name ${maybeAddress} not registered`);
    } else {
      return address;
    }
  }
  // TODO: use Connection codec to check if valid address
  return maybeAddress as Address;
}
