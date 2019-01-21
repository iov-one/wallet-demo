import { ChainId } from "@iov/base-types";
import {
  Address,
  Amount,
  BcpAccount,
  BcpConnection,
  BcpTxQuery,
  ConfirmedTransaction,
  PostTxResponse,
  SendTransaction,
  TxCodec,
} from "@iov/bcp-types";
import { bnsCodec, BnsConnection, RegisterUsernameTx } from "@iov/bns";
import { ChainAddressPair } from "@iov/bns/types/types";
import { bnsFromOrToTag, MultiChainSigner } from "@iov/core";
import { dposFromOrToTag } from "@iov/dpos";
import { PublicIdentity } from "@iov/keycontrol";

import { getUsernameNftByChainAddress, getUsernameNftByUsername } from "./name";
import { getMainIdentity, getMainKeyring } from "./profile";

export function keyToAddress(ident: PublicIdentity, codec: TxCodec = bnsCodec): Address {
  return codec.keyToAddress(ident.pubkey);
}

// TODO: codec should have fromOrToTag function
export function fromOrToTag(address: Address): BcpTxQuery {
  console.log("address -->", address);
  const isBns = address.toString().indexOf("iov") !== -1;
  const query: BcpTxQuery = isBns
    ? { tags: [bnsFromOrToTag(address)] }
    : { tags: [dposFromOrToTag(address)] };
  return query;
}

// queries account on bns chain by default
// TODO: how to handle toher chains easier
export async function getAccount(
  connection: BcpConnection,
  ident: PublicIdentity,
  codec: TxCodec,
): Promise<BcpAccount | undefined> {
  const address = keyToAddress(ident, codec);
  const result = await connection.getAccount({ address });
  if (result.data && result.data.length > 0) {
    return result.data[0];
  }
  return undefined;
}

// looks up account for a given address (or undefined)
export async function getAccountByAddress(
  connection: BcpConnection,
  address: Address,
): Promise<BcpAccount | undefined> {
  const result = await connection.getAccount({ address });
  if (result.data && result.data.length > 0) {
    return result.data[0];
  }
  return undefined;
}

// looks up name for a given address (or undefined)
// this will need to use a much different algorithm when we update to BNS, which is why it is a separate function
export async function getNameByAddress(
  connection: BnsConnection,
  chainId: ChainId,
  address: Address,
): Promise<string | undefined> {
  const nft = await getUsernameNftByChainAddress(connection, chainId, address);
  return nft ? nft.id : undefined;
}

// getAddressByName returns the address associated with the name, or undefined if not registered
// the name should not have the "*iov" suffix
export async function getAddressByName(
  connection: BnsConnection,
  name: string,
  chainId: ChainId,
): Promise<Address | undefined> {
  const nft = await getUsernameNftByUsername(connection, name);
  const match = nft ? nft.addresses.find(addr => addr.chainId === chainId) : undefined;
  return match ? match.address : undefined;
}

export interface Unsubscriber {
  readonly unsubscribe: () => void;
}

// call cb with current state and again on any change.
// it returns an unsubscribe function that can be called to turn off callbacks
export function watchAccount(
  connection: BcpConnection,
  ident: PublicIdentity,
  cb: (acct?: BcpAccount, err?: any) => any,
  codec: TxCodec,
): Unsubscriber {
  const address = keyToAddress(ident, codec);
  const stream = connection.watchAccount({ address });
  const subscription = stream.subscribe({
    next: x => cb(x),
    error: err => cb(undefined, err),
  });
  return subscription;
}

// get update for the transaction information for account

export function watchTransaction(
  connection: BcpConnection,
  ident: PublicIdentity,
  cb: (transaction?: ConfirmedTransaction, err?: any) => any,
  codec: TxCodec,
): Unsubscriber {
  const address = keyToAddress(ident, codec);
  const query = fromOrToTag(address);
  const stream = connection.liveTx(query);
  const subscription = stream.subscribe({
    next: x => cb(x),
    error: err => cb(undefined, err),
  });
  return subscription;
}

// sends the given transaction from the main account
export async function sendTransaction(
  writer: MultiChainSigner,
  chainId: ChainId,
  recipient: Address,
  amount: Amount,
  memo?: string,
): Promise<PostTxResponse> {
  const walletId = getMainKeyring(writer.profile);
  const signer = getMainIdentity(writer.profile);
  const unsigned: SendTransaction = {
    kind: "bcp/send",
    chainId: chainId,
    signer: signer.pubkey,
    recipient: recipient,
    memo: memo || undefined, // use undefined not "" for compatibility with golang codec
    amount,
  };
  return writer.signAndPost(unsigned, walletId);
}

// registers a new username nft on the bns with the given list of chain-address pairs
export async function setName(
  writer: MultiChainSigner,
  bnsId: ChainId,
  username: string,
  addresses: ReadonlyArray<ChainAddressPair>,
): Promise<PostTxResponse> {
  const walletId = getMainKeyring(writer.profile);
  const signer = getMainIdentity(writer.profile);
  const unsigned: RegisterUsernameTx = {
    kind: "bns/register_username",
    chainId: bnsId,
    signer: signer.pubkey,
    username,
    addresses,
  };
  return writer.signAndPost(unsigned, walletId);
}
