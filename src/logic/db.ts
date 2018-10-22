import { AbstractLevelDOWN } from "abstract-leveldown";
import encode from "encoding-down";
import leveljs from "level-js";
import levelup, { LevelUp } from "levelup";
import MemDownConstructor from "memdown";

export type DB<K, V> = LevelUp<AbstractLevelDOWN<K, V>>;
export type StringDB = DB<string, string>;

export function createMemDb(): StringDB {
  return levelup(MemDownConstructor<string, string>());
}

export function createBrowserDb(name: string): StringDB {
  return levelup(encode(leveljs(name)));
}

const isBrowser = () => typeof window !== "undefined" && typeof window.document !== "undefined";

// placeholder to be read from configuration later
export const createDb = (name: string) => (isBrowser() ? createBrowserDb(name) : createMemDb());

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
