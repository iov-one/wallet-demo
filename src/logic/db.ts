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
