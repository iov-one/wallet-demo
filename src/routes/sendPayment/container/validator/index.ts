import { BnsUsernameNft, ChainAddressPair } from "@iov/bns";
import { ChainId } from "@iov/core";

export const isRecipientRegistered = (chainId: ChainId | undefined, nft: BnsUsernameNft): boolean => {
  const nftChain = chainId && nft.addresses.find((address: ChainAddressPair) => address.chainId === chainId);
  const result = !!nftChain;

  return result;
};
