// tslint:disable:no-string-literal
import config from "config";
import PseudoRandom from "random-js";

import { TokenTicker } from "@iov/core";

import { BlockchainSpec } from "./connection";
import { createProfile } from "./profile";

// load some config options
export const testSpec = config["chainSpec"] as BlockchainSpec;
export const testTicker = config["faucetToken"] as TokenTicker;
export const faucetUri = config["defaultFaucetUri"] as string;

export const skipTests = (): boolean => !process.env.BNS_ENABLED;
export const mayTest = skipTests() ? xit : it;

// this is a pre-loaded account we can play with
const adminMnemonic = "scissors media glory glimpse insect trophy cause wheel opinion elite card media";
export const adminProfile = () => createProfile(adminMnemonic);

// this too if needed, but we should usually let the faucet docker process do it's thing
const faucetMnemonic = "lens ski scale risk hawk brush ask link pyramid amazing banner hole";
export const faucetProfile = () => createProfile(faucetMnemonic);

const prng: PseudoRandom.Engine = PseudoRandom.engines.mt19937().autoSeed();
const pool = "abcdefghijklmnopqrstuvwxyz0123456789";
export const randomString = (len: number) => PseudoRandom.string(pool)(prng, len);
