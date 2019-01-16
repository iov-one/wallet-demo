import { BcpConnection, BcpTransactionState, ChainConnector } from "@iov/bcp-types";
import { BnsConnection, bnsConnector, RegisterBlockchainTx } from "@iov/bns";
import { ChainId, MultiChainSigner } from "@iov/core";
import { liskConnector } from "@iov/lisk"

import { getMainIdentity, getMainKeyring } from "./profile";

export enum CodecType {
  Bns = "bns",
  Bov = "bov",
  Lsk = "lsk",
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
    default:
      throw new Error(`Unsupported codecType: ${spec.codecType}`);
  }
}

export async function addBlockchain(
  writer: MultiChainSigner,
  blockchain: BlockchainSpec,
): Promise<BcpConnection> {
  const connector = specToConnector(blockchain);
  const { connection } = await writer.addChain(connector);
  return connection;
}

export async function checkBnsBlockchainNft(
  connection: BnsConnection,
  writer: MultiChainSigner,
  chainId: ChainId,
  codecName: string,
): Promise<void> {
  const result = await connection.getBlockchains({ chainId });
  if (result.length === 0) {
    const registryChainId = await connection.chainId();

    // TODO: is this the proper way? should we pass that in?
    const walletId = getMainKeyring(writer.profile);
    const signer = getMainIdentity(writer.profile);

    const blockchainRegistration: RegisterBlockchainTx = {
      kind: "bns/register_blockchain",
      chainId: registryChainId,
      signer: signer.pubkey,
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
    const response = await writer.signAndPost(blockchainRegistration, walletId);
    await response.blockInfo.waitFor(info => info.state === BcpTransactionState.InBlock);
  }
}
