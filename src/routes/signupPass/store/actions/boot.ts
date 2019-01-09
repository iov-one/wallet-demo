import { BlockchainSpec } from "~/logic";
import { BootResult, bootSequence } from "~/sequences";

export type BootType = (
  password: string,
  blockchains: ReadonlyArray<BlockchainSpec>,
  mnemonic?: string,
) => Promise<BootResult>;

export default (password: string, blockchains: ReadonlyArray<BlockchainSpec>, mnemonic?: string) => async (
  dispatch: any,
): Promise<BootResult> => dispatch(bootSequence(password, blockchains, mnemonic));
