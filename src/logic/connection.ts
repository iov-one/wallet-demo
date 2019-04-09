import { Address, BcpConnection, ChainConnector, PublicIdentity, TokenTicker, TxCodec } from "@iov/bcp";
import { bnsCodec, bnsConnector } from "@iov/bns";
import { ChainId, MultiChainSigner, UserProfile } from "@iov/core";
import { Erc20Options, EthereumCodec, EthereumConnectionOptions, ethereumConnector } from "@iov/ethereum";
import { liskCodec, liskConnector } from "@iov/lisk";

import { ConfigEthereumOptions } from "~/utils/conf";
import { ensureIdentity } from "./profile";

// TODO: move into config file
const erc20Tokens = new Map<TokenTicker, Erc20Options>([
  [
    "WETH" as TokenTicker,
    {
      contractAddress: "0xc778417e063141139fce010982780140aa0cd5ab" as Address,
      decimals: 18,
      symbol: "WETH",
    },
  ],
  [
    "AVO" as TokenTicker,
    {
      contractAddress: "0x0c8184c21a51cdb7df9e5dc415a6a54b3a39c991" as Address,
      decimals: 18,
      symbol: "AVO",
    },
  ],
  [
    // from https://ethereum.stackexchange.com/a/68072
    "ZEENUS" as TokenTicker,
    {
      contractAddress: "0x1f9061B953bBa0E36BF50F21876132DcF276fC6e" as Address,
      decimals: 0,
      symbol: "ZEENUS",
    },
  ],
]);

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
      const options: EthereumConnectionOptions = {
        scraperApiUrl: spec.ethereumOptions ? spec.ethereumOptions.scraperApiUrl : undefined,
        erc20Tokens: erc20Tokens,
      };
      return ethereumConnector(uri, options, spec.chainId);
    default:
      throw new Error(`Unsupported codecType: ${spec.codecType}`);
  }
}

export function specToCodec(spec: BlockchainSpec): TxCodec {
  const configuredEthereumCodec = new EthereumCodec({ erc20Tokens: erc20Tokens });

  switch (spec.codecType) {
    case CodecType.Bns:
    case CodecType.Bov:
      return bnsCodec;
    case CodecType.Lsk:
      return liskCodec;
    case CodecType.Eth:
      return configuredEthereumCodec;
    default:
      throw new Error(`Unsupported codecType: ${spec.codecType}`);
  }
}

export function addressToCodec(address: string): TxCodec {
  const configuredEthereumCodec = new EthereumCodec({ erc20Tokens: erc20Tokens });

  if (address.indexOf("iov") !== -1) {
    return bnsCodec;
  } else if (liskCodec.isValidAddress(address)) {
    return liskCodec;
  } else if (configuredEthereumCodec.isValidAddress(address)) {
    return configuredEthereumCodec;
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
