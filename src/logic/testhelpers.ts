import { TokenTicker } from "@iov/core";

import { BlockchainSpec, CodecType } from "./connection";
import { createProfile } from "./profile";

export const testSpec: BlockchainSpec = {
    codecType: CodecType.Bns,
    bootstrapNodes: ["ws://localhost:23456"],
}
export const testTicker = "CASH" as TokenTicker;

export const skipTests = (): boolean => !process.env.BNS_ENABLED;

const faucetMnemonic = "hidden ask fever furnace alter bridge rib ride banana bargain moon bacon"
export const faucetProfile = () => createProfile(faucetMnemonic);