import PseudoRandom from "random-js";

import { TokenTicker } from "@iov/core";

import { BlockchainSpec, CodecType } from "./connection";
import { createProfile } from "./profile";

export const testSpec: BlockchainSpec = {
  codecType: CodecType.Bns,
  bootstrapNodes: ["ws://localhost:23456"],
};
export const testTicker = "IOV" as TokenTicker;

export const skipTests = (): boolean => !process.env.BNS_ENABLED;
export const mayTest = skipTests() ? xit : it;

const adminMnemonic = "scissors media glory glimpse insect trophy cause wheel opinion elite card media";
export const adminProfile = () => createProfile(adminMnemonic);

const faucetMnemonic = "lens ski scale risk hawk brush ask link pyramid amazing banner hole";
export const faucetProfile = () => createProfile(faucetMnemonic);

const prng: PseudoRandom.Engine = PseudoRandom.engines.mt19937().autoSeed();
const pool = "abcdefghijklmnopqrstuvwxyz0123456789";
export const randomString = (len: number) => PseudoRandom.string(pool)(prng, len);
