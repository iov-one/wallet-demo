import { UserProfile } from "@iov/keycontrol";

import { createMemDb } from "./db";
import {
  cleanMnemonic,
  createProfile,
  getMainIdentity,
  hasStoredProfile,
  loadOrCreateProfile,
} from "./profile";

describe("createProfile", () => {
  it("should return a profile with one keyring, and one identity", async () => {
    const profile = await createProfile();
    expect(profile.wallets.value.length).toEqual(1);
    const { id } = profile.wallets.value[0];
    const idents = profile.getIdentities(id);
    expect(idents.length).toEqual(1);
  });

  it("should return unique identities each time", async () => {
    const profile1 = await createProfile();
    const ident1 = getMainIdentity(profile1);
    expect(ident1).toBeTruthy();

    const profile2 = await createProfile();
    const ident2 = getMainIdentity(profile2);
    expect(ident2).toBeTruthy();

    expect(ident1).not.toEqual(ident2);
    expect(ident1.id).not.toEqual(ident2.id);
  });
});

describe("getMainIdentity", () => {
  it("should error if no data present", async () => {
    const profile = new UserProfile();
    expect(() => getMainIdentity(profile)).toThrow();
  });
});

describe("hasStoredProfile", () => {
  it("should flag if safe to load", async () => {
    const password = "some secret string";

    const db = createMemDb();
    expect(await hasStoredProfile(db)).toBe(false);
    await expect(UserProfile.loadFrom(db, password)).rejects.toThrow(/Key not found/);

    const profile = await createProfile();
    await profile.storeIn(db, password);
    expect(await hasStoredProfile(db)).toBe(true);

    const loaded = await UserProfile.loadFrom(db, password);
    // compare the identities based on unique identifier (id)
    expect(getMainIdentity(loaded).id).toEqual(getMainIdentity(profile).id);
  });
});

describe("loadOrCreateProfile", () => {
  it("should work on empty and full db", async () => {
    const db = createMemDb();
    const password = "foobar";

    const profile1 = await loadOrCreateProfile(db, password);
    const profile2 = await loadOrCreateProfile(db, password);
    expect(getMainIdentity(profile2).id).toEqual(getMainIdentity(profile1).id);
  });

  it("should error loading with invalid password", async () => {
    const db = createMemDb();
    const password = "can't guess this!";

    // first time should work with any password
    await loadOrCreateProfile(db, password);
    // second load fails if password doesn't match
    await expect(loadOrCreateProfile(db, "bad password")).rejects.toThrow("invalid usage");
  });

  it("generates new profile from mnemonic", async () => {
    const db = createMemDb();
    const mnemonic = "kiss assault oxygen consider duck auto annual nerve census cloth stem park";
    const password = "foobar";

    // create matches mnemonic
    const profile1 = await loadOrCreateProfile(db, password, mnemonic);
    const walletId = profile1.wallets.value[0].id;
    expect(walletId).toBeDefined();
    expect(profile1.printableSecret(walletId)).toEqual(mnemonic);

    // reload with same mnemonic
    const profile2 = await loadOrCreateProfile(db, password);
    expect(getMainIdentity(profile2).id).toEqual(getMainIdentity(profile1).id);
    expect(profile2.printableSecret(walletId)).toEqual(mnemonic);
  });

  it("overwrites existing profile when mnemonic provided", async () => {
    const db = createMemDb();
    const mnemonic = "kiss assault oxygen consider duck auto annual nerve census cloth stem park";
    const password = "foobar";
    const mnemonic2 = "beach young hobby distance confirm material coin endless buzz correct express they";
    const password2 = "bazoom";

    // create matches mnemonic
    const profile1 = await loadOrCreateProfile(db, password, mnemonic);
    const walletId = profile1.wallets.value[0].id;
    expect(walletId).toBeDefined();
    expect(profile1.printableSecret(walletId)).toEqual(mnemonic);

    // reload with different mnemonic and password works (overwrite)
    const profile2 = await loadOrCreateProfile(db, password2, mnemonic2);
    const walletId2 = profile2.wallets.value[0].id;
    expect(walletId2).toBeDefined();
    expect(walletId2).not.toEqual(walletId);
    expect(getMainIdentity(profile2).id).not.toEqual(getMainIdentity(profile1).id);
    expect(profile2.printableSecret(walletId2)).toEqual(mnemonic2);
  });
});

describe("cleanMnemonic", () => {
  it("should normalize many cases", () => {
    expect(cleanMnemonic("foo")).toEqual("foo");
    expect(cleanMnemonic("\tFoo \n")).toEqual("foo");
    expect(cleanMnemonic(" One TWO three     ")).toEqual("one two three");
    // clean up all whitespace
    expect(cleanMnemonic("LINE ONE\nLINE TWO\nLINE\tTHREE")).toEqual("line one line two line three");
    // don't fix punctuation of other such errors
    expect(cleanMnemonic(" One. TWO three!")).toEqual("one. two three!");
  });
});
