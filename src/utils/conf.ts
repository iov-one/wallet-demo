// tslint:disable:no-string-literal
import config from "config";

function isArrayOfStrings(array: ReadonlyArray<any>): array is ReadonlyArray<string> {
  return array.every(element => typeof element === "string");
}

export function parseConfig(conf: any): any {
  if (!conf.chainSpec || !conf.chainSpec.codecType || !conf.chainSpec.bootstrapNodes || !conf.defaultPassword) {
    throw new Error("Missed required property in config file");
  }

  if (typeof conf.chainSpec.codecType !== "string") {
    throw new Error("Invalid codecType in chainSpec");
  }

  if (!Array.isArray(conf.chainSpec.bootstrapNodes)) {
    throw new Error("bootstrapNodes in chainSpec should be an array");
  }

  if (!isArrayOfStrings(conf.chainSpec.bootstrapNodes)) {
    throw new Error("Found non-string element in bootstrapNodes array");
  }

  if (conf.defaultFaucetUri) {
    if (!conf.defaultFaucetUri.match(/^https?:\/\//)) {
      throw new Error("Expected faucet uri to start with http:// or https://");
    }

    if(!conf.faucetToken) {
      throw new Error("Expected faucet Token")
    }

    if (typeof conf.faucetToken !== "string") {
      throw new Error("faucet Token must be a string");
    }
  }

  return conf;
}

export function loadConfig(): any {
  return parseConfig(config);
}
