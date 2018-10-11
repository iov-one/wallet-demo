import {
  Address,
  BcpAccount,
  BcpConnection,
  BcpTransactionResponse,
  FungibleToken,
  TransactionKind,
  TxCodec,
  UnsignedTransaction,
} from "@iov/bcp-types";
import { bnsCodec } from "@iov/bns";
import { MultiChainSigner } from "@iov/core";
import { PublicIdentity } from "@iov/keycontrol";
import { ChainId } from "@iov/tendermint-types";

import { getMainIdentity, getMainKeyring } from "./profile";

export function keyToAddress(ident: PublicIdentity, codec: TxCodec = bnsCodec): Address {
  return codec.keyToAddress(ident.pubkey);
}

// queries account on bns chain by default
// TODO: how to handle toher chains easier
export async function getAccount(
  reader: BcpConnection,
  ident: PublicIdentity,
  codec?: TxCodec,
): Promise<BcpAccount | undefined> {
  const address = keyToAddress(ident, codec);
  const result = await reader.getAccount({ address });
  if (result.data && result.data.length > 0) {
    return result.data[0];
  }
  return undefined;
}

export interface Unsubscriber {
  readonly unsubscribe: () => void;
}

// call cb with current state and again on any change.
// it returns an unsubscribe function that can be called to turn off callbacks
export function watchAccount(
  reader: BcpConnection,
  ident: PublicIdentity,
  cb: (acct?: BcpAccount) => any,
  codec?: TxCodec,
): Unsubscriber {
  const address = keyToAddress(ident, codec);
  const stream = reader.watchAccount({ address });
  const subscription = stream.subscribe({
    next: cb,
    error: err => {
      throw err;
    },
  });
  return subscription;
}

// sends the given transaction from the main account
export async function sendTransaction(
  writer: MultiChainSigner,
  chainId: ChainId,
  recipient: Address,
  amount: FungibleToken,
  memo?: string,
): Promise<BcpTransactionResponse> {
  const walletId = getMainKeyring(writer.profile);
  const signer = getMainIdentity(writer.profile);
  const unsigned: UnsignedTransaction = {
    kind: TransactionKind.Send,
    chainId: chainId,
    signer: signer.pubkey,
    recipient: recipient,
    memo,
    amount,
  };
  return writer.signAndCommit(unsigned, walletId);
}

// sets the name of the given account (old-style, pre-bns)
export async function setName(
  writer: MultiChainSigner,
  chainId: ChainId,
  name: string,
): Promise<BcpTransactionResponse> {
  const walletId = getMainKeyring(writer.profile);
  const signer = getMainIdentity(writer.profile);
  const unsigned: UnsignedTransaction = {
    kind: TransactionKind.SetName,
    chainId: chainId,
    signer: signer.pubkey,
    name,
  };
  return writer.signAndCommit(unsigned, walletId);
}
