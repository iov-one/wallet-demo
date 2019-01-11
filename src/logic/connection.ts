import { BcpConnection, BcpTransactionState, ChainConnector } from "@iov/bcp-types";
import { BnsConnection, bnsConnector, RegisterBlockchainTx } from "@iov/bns";
import { ChainId, MultiChainSigner } from "@iov/core";

import { getMainIdentity, getMainKeyring } from "./profile";
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

export async function checkBnsBlockchainNft(
  writer: MultiChainSigner,
  blockchain: BlockchainSpec,
  chainId: ChainId
): Promise<void> {
  const connection = await BnsConnection.establish(blockchain.bootstrapNodes[0]);
  const result = await connection.getBlockchains({chainId: chainId});
  if (result.length === 0) {
    const registryChainId = await connection.chainId();

    // Register blockchain
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
      codecName: "wonderland_rules",
      codecConfig: `{ "any" : [ "json", "content" ] }`,
    };
    {
      const response = await writer.signAndPost(blockchainRegistration, walletId);
      await response.blockInfo.waitFor(info => info.state === BcpTransactionState.InBlock);
    } 
  }
}
