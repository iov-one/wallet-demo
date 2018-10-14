import { AbstractLevelDOWN } from "abstract-leveldown";
import { browsedown } from "browsedown";
import encode from "encoding-down";
import leveldown from "leveldown";
import levelup, { LevelUp } from "levelup";
import MemDownConstructor from "memdown";

export type DB<K, V> = LevelUp<AbstractLevelDOWN<K, V>>;
export type StringDB = DB<string, string>;

export function createMemDb(): StringDB {
  return levelup(MemDownConstructor<string, string>());
}

export function createBrowserDb(name: string): StringDB {
  return levelup(browsedown(name));
}

export function createLevelDb(path: string): StringDB {
  // encode will turn Buffers into utf-8 strings, so we always get strings back
  return levelup(encode(leveldown(path)));
}

/*** TODO: move this into some configuration file.... node-config? ***/
const isTest = () => typeof global.it === "function";

const isNode = () => typeof process !== "undefined" && !!process.versions && !!process.versions.node;

const isBrowser = () => typeof window !== "undefined" && typeof window.document !== "undefined";

// This should be smarter, put it in some default dir, etc...
const nameToPath = (name: string) => `${name}.db`;
/*** end TODO ****/

// createDb auto-detects proper db to use
export function createDb(name: string): StringDB {
  if (isTest()) {
    return createMemDb();
  } else if (isNode()) {
    return createLevelDb(nameToPath(name));
  } else if (isBrowser()) {
    return createBrowserDb(name);
  } else {
    throw new Error("I don't know where I am!");
  }
}

export async function hasDbKey(db: StringDB, key: string): Promise<boolean> {
  try {
    await db.get(key);
    return true;
  } catch (err) {
    if (isNotFoundError(err)) {
      return false;
    }
    throw err;
  }
}

const isNotFoundError = (err: any) => err && err.notFound;
