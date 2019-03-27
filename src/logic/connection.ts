import { BcpConnection, ChainConnector, PublicIdentity, TxCodec } from "@iov/bcp";
import { bnsCodec, bnsConnector } from "@iov/bns";
import { ChainId, MultiChainSigner, UserProfile } from "@iov/core";
import { ethereumCodec, ethereumConnector } from "@iov/ethereum";
import { liskCodec, liskConnector } from "@iov/lisk";

import { ensureIdentity } from "./profile";

export enum CodecType {
  Bns = "bns",
  Bov = "bov",
  Lsk = "lsk",
  Eth = "eth",
}

export interface BcpBlockchain {
  readonly connection: BcpConnection;
  readonly codec: TxCodec;
  readonly identity: PublicIdentity;
}

// BlockchainSpec is a config option, such as may be returned from bns in the future
export interface BlockchainSpec {
  readonly chainId?: ChainId; // if non-empty, enforce this
  readonly codecType: CodecType;
  readonly bootstrapNodes: ReadonlyArray<string>;
}

export function specToConnector(spec: BlockchainSpec): ChainConnector {
  if (spec.bootstrapNodes.length < 1) {
    throw new Error("No bootstrap nodes defined");
  }
  // TODO: select them round-robin
  const uri = spec.bootstrapNodes[0];

  switch (spec.codecType) {
    case CodecType.Bns:
    case CodecType.Bov:
      return { ...bnsConnector(uri), expectedChainId: spec.chainId };
    case CodecType.Lsk:
      return { ...liskConnector(uri), expectedChainId: spec.chainId };
    case CodecType.Eth:
      return {
        ...ethereumConnector(uri, { scraperApiUrl: spec.bootstrapNodes[1] }),
        expectedChainId: spec.chainId,
      };
    default:
      throw new Error(`Unsupported codecType: ${spec.codecType}`);
  }
}
export function specToCodec(spec: BlockchainSpec): TxCodec {
  switch (spec.codecType) {
    case CodecType.Bns:
    case CodecType.Bov:
      return { ...bnsCodec };
    case CodecType.Lsk:
      return { ...liskCodec };
    case CodecType.Eth:
      return { ...ethereumCodec };
    default:
      throw new Error(`Unsupported codecType: ${spec.codecType}`);
  }
}

export function addressToCodec(address: string): TxCodec {
  if (address.indexOf("iov") !== -1) {
    return bnsCodec;
  } else if (liskCodec.isValidAddress(address)) {
    return liskCodec;
  } else if (ethereumCodec.isValidAddress(address)) {
    return ethereumCodec;
  } else {
    throw new Error(`Unsupported Address Type: ${address}`);
  }
}

// add blockchain will add a connection to the signer, and create an identity if needed on the profile
export async function addBlockchain(
  writer: MultiChainSigner,
  profile: UserProfile,
  blockchain: BlockchainSpec,
): Promise<BcpBlockchain> {
  const connector = specToConnector(blockchain);
  const codec = specToCodec(blockchain);
  const { connection } = await writer.addChain(connector);
  // we now ensure there is a identity set up for this blockchain here
  const identity = await ensureIdentity(profile, connection.chainId(), blockchain.codecType);
  return { connection, codec, identity };
}
