// tslint:disable:no-string-literal
import PseudoRandom from "random-js";

import { BlockchainSpec } from "./connection";
import { createProfile } from "./profile";

import { loadConfig } from "../utils/conf";

// load some config options
export const testSpec = async () => {
  const config = await loadConfig();
  return config.bns.chainSpec as BlockchainSpec;
};
export const faucetSpec = async () => {
  const config = await loadConfig();
  return config.bns.faucetSpec!;
};
export const testChains = async () => {
  const config = await loadConfig();
  return config.chains.map(cfg => cfg.chainSpec as BlockchainSpec);
};

export const skipTests = (): boolean => !process.env.BNS_ENABLED;
export const mayTest = skipTests() ? xit : it;

// this is a pre-loaded account we can play with (separate from the faucet)
const adminMnemonic = "scissors media glory glimpse insect trophy cause wheel opinion elite card media";
export const adminProfile = () => createProfile(adminMnemonic);

const prng: PseudoRandom.Engine = PseudoRandom.engines.mt19937().autoSeed();
const pool = "abcdefghijklmnopqrstuvwxyz0123456789";
export const randomString = (len: number) => PseudoRandom.string(pool)(prng, len);
