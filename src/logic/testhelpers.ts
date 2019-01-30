// tslint:disable:no-string-literal
import PseudoRandom from "random-js";

import { BlockchainSpec } from "./connection";
import { createProfile } from "./profile";

import { allFaucetSpecs, loadConfig } from "../utils/conf";

// load some config options
export const testSpec = async () => {
  const config = await loadConfig();
  return config.bns.chainSpec as BlockchainSpec;
};
export const testChains = async () => {
  const config = await loadConfig();
  return config.chains.map(cfg => cfg.chainSpec as BlockchainSpec);
};
export const bnsFaucetSpec = async () => {
  const config = await loadConfig();
  return config.bns.faucetSpec;
};
export const faucetSpecs = async () => {
  const config = await loadConfig();
  return allFaucetSpecs(config);
};

export const skipTests = (envVar: string | undefined): boolean => !envVar;
export const mayTestBns = skipTests(process.env.BNS_ENABLED) ? xit : it;
export const mayTestFull =
  !skipTests(process.env.BNS_ENABLED) && !skipTests(process.env.CHAINS_ENABLED) ? it : xit;

// this is a pre-loaded account we can play with (separate from the faucet)
const adminMnemonic = "wage excuse odor equip paddle remain journey weekend mouse fork orchard more";
export const adminProfile = () => createProfile(adminMnemonic);

const prng: PseudoRandom.Engine = PseudoRandom.engines.mt19937().autoSeed();
const pool = "abcdefghijklmnopqrstuvwxyz0123456789";
export const randomString = (len: number) => PseudoRandom.string(pool)(prng, len);
