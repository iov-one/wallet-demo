import { Address, BcpConnection, ChainConnector, PublicIdentity, TokenTicker, TxCodec } from "@iov/bcp";
import { bnsConnector } from "@iov/bns";
import { ChainId, MultiChainSigner, UserProfile } from "@iov/core";
import { Erc20Options, EthereumConnectionOptions, ethereumConnector } from "@iov/ethereum";
import { liskConnector } from "@iov/lisk";

import { ConfigEthereumOptions } from "~/utils/conf";
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
  readonly ethereumOptions?: ConfigEthereumOptions;
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
      const erc20s: ReadonlyArray<[TokenTicker, Erc20Options]> =
        spec.ethereumOptions && spec.ethereumOptions.erc20s
          ? spec.ethereumOptions.erc20s.map(
              (row): [TokenTicker, Erc20Options] => [
                row.symbol as TokenTicker,
                {
                  contractAddress: row.contractAddress as Address,
                  symbol: row.symbol as TokenTicker,
                  decimals: row.decimals,
                },
              ],
            )
          : [];

      const options: EthereumConnectionOptions = {
        scraperApiUrl: spec.ethereumOptions ? spec.ethereumOptions.scraperApiUrl : undefined,
        erc20Tokens: new Map(erc20s),
      };
      return ethereumConnector(uri, options, spec.chainId);
    default:
      throw new Error(`Unsupported codecType: ${spec.codecType}`);
  }
}

// add blockchain will add a connection to the signer, and create an identity if needed on the profile
export async function addBlockchain(
  writer: MultiChainSigner,
  profile: UserProfile,
  blockchain: BlockchainSpec,
): Promise<BcpBlockchain> {
  const connector = specToConnector(blockchain);
  const { connection } = await writer.addChain(connector);
  // we now ensure there is a identity set up for this blockchain here
  const identity = await ensureIdentity(profile, connection.chainId(), blockchain.codecType);
  return { connection, codec: connector.codec, identity };
}
