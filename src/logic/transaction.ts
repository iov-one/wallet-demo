import {
  BcpConnection,
  ChainId,
  ConfirmedTransaction,
  isBlockInfoFailed,
  isBlockInfoPending,
  isSendTransaction,
  PostTxResponse,
  PublicIdentity,
  PublicKeyBundle,
  SendTransaction,
  TxCodec,
  UnsignedTransaction,
} from "@iov/bcp-types";
import { BnsConnection, RegisterBlockchainTx } from "@iov/bns";
import { MultiChainSigner, UserProfile } from "@iov/core";
import { ReadonlyDate } from "readonly-date";

import { getNameByAddress, keyToAddress } from "./account";
import { getWalletAndIdentity } from "./profile";

export interface AnnotatedConfirmedTransaction<T extends UnsignedTransaction = SendTransaction>
  extends ConfirmedTransaction<T> {
  readonly received: boolean;
  readonly time: ReadonlyDate;
  readonly success: boolean;
  // these are always set to the raw values (TODO: handle multisig)
  readonly signerAddr: string;
  readonly recipientAddr: string;
  // these are set for reverse lookup of valuename
  readonly signerName?: string;
  readonly recipientName?: string;
  readonly chainId: ChainId;
  readonly memo?: string;
}

const keysEqual = (a: PublicKeyBundle, b: PublicKeyBundle): boolean =>
  a.algo === b.algo && arraysEqual(a.data, b.data);

const arraysEqual = (a: Uint8Array, b: Uint8Array): boolean => {
  if (a.length !== b.length) {
    return false;
  }
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) {
      return false;
    }
  }
  return true;
};

export const parseConfirmedTransaction = async (
  bnsConn: BnsConnection,
  conn: BcpConnection,
  trans: ConfirmedTransaction,
  identity: PublicIdentity,
  codec: TxCodec,
): Promise<AnnotatedConfirmedTransaction | undefined> => {
  const payload = trans.transaction;
  if (!isSendTransaction(payload)) {
    console.log(`Only handle SendTransaction for now, got ${payload.kind}`);
    return undefined;
  }
  const received = !keysEqual(trans.primarySignature.pubkey, identity.pubkey);
  // we get header and time from the chain the tx comes from
  const header = await conn.getBlockHeader(trans.height);
  const time = header.time;
  // we look up names from the bns chain
  const chainId = conn.chainId();
  const recipientAddr = payload.recipient;
  const recipientName = await getNameByAddress(bnsConn, chainId, recipientAddr);
  const ident: PublicIdentity = {
    chainId: chainId,
    pubkey: trans.primarySignature.pubkey as PublicKeyBundle,
  };
  const signerAddr = keyToAddress(ident, codec);
  const signerName = await getNameByAddress(bnsConn, chainId, signerAddr);
  return {
    ...(trans as ConfirmedTransaction<SendTransaction>),
    received,
    time,
    success: true,
    recipientAddr,
    recipientName,
    signerAddr,
    signerName,
    chainId,
    memo: payload.memo,
  };
};

export async function checkBnsBlockchainNft(
  profile: UserProfile,
  connection: BnsConnection,
  writer: MultiChainSigner,
  chainId: ChainId,
  codecName: string,
): Promise<void> {
  const result = await connection.getBlockchains({ chainId });
  if (result.length === 0) {
    const registryChainId = await connection.chainId();

    const { walletId, identity: signer } = getWalletAndIdentity(profile, connection.chainId());

    const blockchainRegistration: RegisterBlockchainTx = {
      kind: "bns/register_blockchain",
      creator: {
        chainId: registryChainId,
        pubkey: signer.pubkey,
      },
      chain: {
        chainId: chainId,
        production: false,
        enabled: true,
        name: "Wonderland",
        networkId: "7rg047g4h",
      },
      codecName,
      codecConfig: `{ }`,
    };
    await waitForCommit(writer.signAndPost(blockchainRegistration, walletId));
  }
}

// this waits for one commit to be writen, then returns the response
// if either CheckTx or DeliverTx error, then this will throw an error.
// If it succeeds, we are assured that PostTxResponse.blockInfo.value is of type BlockInfoSucceeded
export async function waitForCommit(req: Promise<PostTxResponse>): Promise<PostTxResponse> {
  // this throws error if the query fails on CheckTx
  const res = await req;
  const info = await res.blockInfo.waitFor(x => !isBlockInfoPending(x));
  if (isBlockInfoFailed(info)) {
    throw new Error(`(${info.code}) ${info.message}`);
  }
  return res;
}
