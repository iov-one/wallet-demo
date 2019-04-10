import {
  Account,
  Address,
  Amount,
  BcpConnection,
  ChainId,
  PostTxResponse,
  PublicIdentity,
  SendTransaction,
  TxCodec,
} from "@iov/bcp";
import { BnsConnection, ChainAddressPair, RegisterUsernameTx } from "@iov/bns";
import { MultiChainSigner, UserProfile } from "@iov/core";

import { getUsernameNftByChainAddress, getUsernameNftByUsername } from "./name";
import { getWalletAndIdentity } from "./profile";

// queries account on bns chain by default
// TODO: how to handle toher chains easier
export async function getAccount(
  connection: BcpConnection,
  ident: PublicIdentity,
  codec: TxCodec,
): Promise<Account | undefined> {
  const address = codec.identityToAddress(ident);
  const result = await connection.getAccount({ address });
  return result;
}

// looks up account for a given address (or undefined)
export async function getAccountByAddress(
  connection: BcpConnection,
  address: Address,
): Promise<Account | undefined> {
  const result = await connection.getAccount({ address });
  return result;
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
  cb: (acct?: Account, err?: any) => any,
  codec: TxCodec,
): Unsubscriber {
  const address = codec.identityToAddress(ident);
  const stream = connection.watchAccount({ address });
  const subscription = stream.subscribe({
    next: x => cb(x),
    error: err => cb(undefined, err),
  });
  return subscription;
}

// sends the given transaction from the main account
export async function sendTransaction(
  profile: UserProfile,
  writer: MultiChainSigner,
  chainId: ChainId,
  recipient: Address,
  amount: Amount,
  memo?: string,
): Promise<PostTxResponse> {
  const { identity: creator } = getWalletAndIdentity(profile, chainId);

  const unsigned: SendTransaction = {
    kind: "bcp/send",
    creator: creator,
    recipient: recipient,
    memo: memo || undefined, // use undefined not "" for compatibility with golang codec
    amount,
  };

  const fee = await writer.connection(chainId).getFeeQuote(unsigned);

  return writer.signAndPost({ ...unsigned, fee: fee });
}

// registers a new username nft on the bns with the given list of chain-address pairs
export async function setName(
  profile: UserProfile,
  writer: MultiChainSigner,
  bnsId: ChainId,
  username: string,
  addresses: ReadonlyArray<ChainAddressPair>,
): Promise<PostTxResponse> {
  const { identity: creator } = getWalletAndIdentity(profile, bnsId);
  const unsigned: RegisterUsernameTx = {
    kind: "bns/register_username",
    creator: creator,
    username,
    addresses,
  };

  const fee = await writer.connection(bnsId).getFeeQuote(unsigned);

  return writer.signAndPost({ ...unsigned, fee: fee });
}
