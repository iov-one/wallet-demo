// tslint:disable:no-string-literal
import axios from "axios";
import config from "config";

import { TokenTicker } from "@iov/core";

let configFile: Config;

export interface Config {
  readonly bns: ChainConfig;
  readonly chains: ReadonlyArray<ChainConfig>;
  readonly defaultPassword: string;
}

export interface ChainConfig {
  readonly chainSpec: ChainSpec;
  readonly faucetSpec?: FaucetSpec;
}

export interface ChainSpec {
  readonly codecType: string;
  readonly bootstrapNodes: ReadonlyArray<string>;
}

export interface FaucetSpec {
  readonly uri: string;
  readonly token: TokenTicker;
}

function isArrayOfStrings(array: ReadonlyArray<any>): array is ReadonlyArray<string> {
  return array.every(element => typeof element === "string");
}

export function parseChainConfig(chainConf: any): void {
  if (
    !chainConf.chainSpec ||
    !chainConf.chainSpec.codecType ||
    !chainConf.chainSpec.bootstrapNodes ||
    !chainConf.defaultPassword
  ) {
    throw new Error("Missed required property in chain config");
  }

  if (typeof chainConf.chainSpec.codecType !== "string") {
    throw new Error("Invalid codecType in chainSpec");
  }

  if (!Array.isArray(chainConf.chainSpec.bootstrapNodes)) {
    throw new Error("bootstrapNodes in chainSpec should be an array");
  }

  if (!isArrayOfStrings(chainConf.chainSpec.bootstrapNodes)) {
    throw new Error("Found non-string element in bootstrapNodes array");
  }

  if (chainConf.faucetSpec) {
    if (!chainConf.faucetSpec.uri.match(/^https?:\/\//)) {
      throw new Error("Expected faucet uri to start with http:// or https://");
    }

    if (!chainConf.faucetSpec.token) {
      throw new Error("Expected faucet Token");
    }

    if (typeof chainConf.faucetSpec.token !== "string") {
      throw new Error("faucet Token must be a string");
    }
  }
}

export function parseConfig(conf: any): Config {
  if (!conf.bns || !conf.chains) {
    throw new Error("Missed required property in config file");
  }

  parseChainConfig(conf.bns);
  // conf.chains.map((chain: any) => parseChainConfig(chain));
  return conf;
}

export async function loadConfig(): Promise<Config> {
  if (configFile === undefined) {
    let configData: any;
    try {
      const response = await axios.get("/config.json");
      configData = response.data ? response.data : config;
    } catch {
      configData = config;
    }
    configFile = parseConfig(configData);
  }
  return configFile;
}
