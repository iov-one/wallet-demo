// tslint:disable:no-unused-expression
import { expect } from "chai";
import "mocha";

import { UserProfile } from "@iov/keycontrol";

import { createMemDb } from "./db";
import { createProfile, getMainIdentity, hasStoredProfile, loadOrCreateProfile } from "./profile";

describe("createProfile", () => {
  it("should return a profile with one keyring, and one identity", async () => {
    const profile = await createProfile();
    expect(profile.wallets.value.length).to.equal(1);
    const { id } = profile.wallets.value[0];
    const idents = profile.getIdentities(id);
    expect(idents.length).to.equal(1);
  });

  it("should return unique identities each time", async () => {
    const profile1 = await createProfile();
    const ident1 = getMainIdentity(profile1);
    expect(ident1).to.be.ok;

    const profile2 = await createProfile();
    const ident2 = getMainIdentity(profile2);
    expect(ident2).to.be.ok;

    expect(ident1).not.to.equal(ident2);
    expect(ident1.id).not.to.equal(ident2.id);
  });
});

describe("getMainIdentity", () => {
  it("should error if no data present", async () => {
    const profile = new UserProfile();
    expect(() => getMainIdentity(profile)).to.throw();
  });
});

describe("hasStoredProfile", () => {
  it("should flag if safe to load", async () => {
    const password = "some secret string";

    const db = createMemDb();
    expect(await hasStoredProfile(db)).to.be.false;
    expect(UserProfile.loadFrom(db, password)).to.be.rejected;

    const profile = await createProfile();
    await profile.storeIn(db, password);
    expect(await hasStoredProfile(db)).to.be.true;

    const loaded = await UserProfile.loadFrom(db, password);
    // compare the identities based on unique identifier (id)
    expect(getMainIdentity(loaded).id).to.equal(getMainIdentity(profile).id);
  });
});

describe("loadOrCreateProfile", () => {
  it("should work on empty and full db", async () => {
    const db = createMemDb();
    const password = "foobar";

    const profile1 = await loadOrCreateProfile(db, password);
    const profile2 = await loadOrCreateProfile(db, password);
    expect(getMainIdentity(profile2).id).to.equal(getMainIdentity(profile1).id);
  });

  it("should error loading with invalid password", async () => {
    const db = createMemDb();
    const password = "can't guess this!";

    // first time should work with any password
    await loadOrCreateProfile(db, password);
    // second load fails if password doesn't match
    expect(loadOrCreateProfile(db, "bad password")).to.be.rejected;
  });
});
