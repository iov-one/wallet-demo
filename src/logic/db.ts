import { AbstractLevelDOWN } from "abstract-leveldown";
import levelup, { LevelUp } from "levelup";
import MemDownConstructor from "memdown";

export type DB<K, V> = LevelUp<AbstractLevelDOWN<K, V>>;
export type StringDB = DB<string, string>;

export function createMemDb(): StringDB {
  return levelup(MemDownConstructor<string, string>());
}
// TODO: create leveldb, indexeddb variants

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
