import { BlockchainSpec } from "~/logic";
import { BootResult, bootSequence } from "~/sequences/boot";

export type BootType = (
  password: string,
  bns: BlockchainSpec,
  blockchains: ReadonlyArray<BlockchainSpec>,
  mnemonic?: string,
) => Promise<BootResult>;

export default (
  password: string,
  bns: BlockchainSpec,
  blockchains: ReadonlyArray<BlockchainSpec>,
  mnemonic?: string,
) => async (dispatch: any): Promise<BootResult> =>
  dispatch(bootSequence(password, bns, blockchains, mnemonic));
