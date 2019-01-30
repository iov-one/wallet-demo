import {
  Address,
  Amount,
  BcpAccount,
  BcpConnection,
  ChainId,
  ConfirmedTransaction,
  isConfirmedTransaction,
  PostTxResponse,
  PublicIdentity,
  SendTransaction,
  TxCodec,
} from "@iov/bcp-types";
import { BnsConnection, RegisterUsernameTx } from "@iov/bns";
import { ChainAddressPair } from "@iov/bns/types/types";
import { MultiChainSigner, UserProfile } from "@iov/core";

import { getUsernameNftByChainAddress, getUsernameNftByUsername } from "./name";
import { getWalletAndIdentity } from "./profile";

export function keyToAddress(ident: PublicIdentity, codec: TxCodec): Address {
  return codec.identityToAddress(ident);
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
  return result;
}

// looks up account for a given address (or undefined)
export async function getAccountByAddress(
  connection: BcpConnection,
  address: Address,
): Promise<BcpAccount | undefined> {
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
  const stream = connection.liveTx({ sentFromOrTo: address });
  const subscription = stream.subscribe({
    next: x => {
      if (!isConfirmedTransaction(x)) {
        throw new Error("Confirmed transaction expected");
      }
      cb(x);
    },
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
  const {walletId, identity: signer} = getWalletAndIdentity(profile, chainId);
  const unsigned: SendTransaction = {
    kind: "bcp/send",
    creator: {
      chainId: chainId,
      pubkey: signer.pubkey,
    },
    recipient: recipient,
    memo: memo || undefined, // use undefined not "" for compatibility with golang codec
    amount,
  };
  return writer.signAndPost(unsigned, walletId);
}

// registers a new username nft on the bns with the given list of chain-address pairs
export async function setName(
  profile: UserProfile,
  writer: MultiChainSigner,
  bnsId: ChainId,
  username: string,
  addresses: ReadonlyArray<ChainAddressPair>,
): Promise<PostTxResponse> {
  const {walletId, identity: signer} = getWalletAndIdentity(profile, bnsId);
  const unsigned: RegisterUsernameTx = {
    kind: "bns/register_username",
    creator: {
      chainId: bnsId,
      pubkey: signer.pubkey,
    },
    username,
    addresses,
  };
  return writer.signAndPost(unsigned, walletId);
}
