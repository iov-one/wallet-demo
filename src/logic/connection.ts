import { BcpConnection, ChainConnector } from "@iov/bcp-types";
import { bnsConnector } from "@iov/bns";
import { ChainId, MultiChainSigner } from "@iov/core";
// import { UserProfile } from "@iov/keycontrol";

/**** this may make it into iov-core *******/

export enum CodecType {
  Bns = "bns",
  // Lisk = "lisk",
}

// BlockchainSpec is a config option, such as may be returned from bns in the future
export interface BlockchainSpec {
  readonly chainId?: ChainId; // if non-empty, enforce this
  readonly codecType: CodecType;
  readonly bootstrapNodes: ReadonlyArray<string>;
}

function specToConnector(spec: BlockchainSpec): ChainConnector {
  if (spec.bootstrapNodes.length < 1) {
    throw new Error("No bootstrap nodes defined");
  }
  // TODO: select them round-robin
  const uri = spec.bootstrapNodes[0];

  switch (spec.codecType) {
    case CodecType.Bns:
      return { ...bnsConnector(uri), expectedChainId: spec.chainId };
    default:
      throw new Error(`Unsupported codecType: ${spec.codecType}`);
  }
}

/******* end iov-core proposal ********/

export async function addBlockchain(
  writer: MultiChainSigner,
  blockchain: BlockchainSpec,
): Promise<BcpConnection> {
  const connector = specToConnector(blockchain);
  const { connection } = await writer.addChain(connector);
  return connection;
}
