import { ChainId } from "@iov/bcp-types";
import { UserProfile } from "@iov/core";

import { createMemDb, hasStoredProfile, loadOrCreateProfile } from "../../logic";
import { aNewStore } from "../../store";
import { fixTypes } from "../helpers";
import { createProfileAsyncAction } from "./actions";

describe("profile async actions", () => {
  it("initializes a fresh redux store", async () => {
    const store = aNewStore();
    const init = store.getState();
    expect(init.profile.internal.profile).toBeUndefined();
    expect(init.profile.internal.db).not.toBeUndefined();
    const db = init.profile.internal.db;
    // const db = createMemDb();

    // validate it is empty
    const dirty = await hasStoredProfile(db);
    expect(dirty).toEqual(false);

    // ensure the action is correct
    const create = createProfileAsyncAction.start(db, "my-secret-here", undefined, {});
    expect(create.type).toEqual("CREATE_PROFILE");
    expect(create.payload.then).not.toBeUndefined();

    // dispatch and check out the return values
    // NOTE: this is not properly captured by the type-system!

    const { action, value } = await fixTypes(store.dispatch(create));
    expect(action.type).toEqual("CREATE_PROFILE_FULFILLED");
    const profile: UserProfile = value;
    expect(profile).not.toBeUndefined();

    // make sure the profile is set properly
    const after = store.getState();
    const storeProfile = after.profile.internal.profile;
    expect(storeProfile).not.toBeUndefined();
    expect(storeProfile!.wallets.value).toEqual(profile.wallets.value);
  });

  it("recovers a redux store from mnemonic", async () => {
    const store = aNewStore();
    const init = store.getState();
    expect(init.profile.internal.profile).toBeUndefined();
    expect(init.profile.internal.db).not.toBeUndefined();
    const db = init.profile.internal.db;
    // const db = createMemDb();

    const dirty = await hasStoredProfile(db);
    expect(dirty).toEqual(false);

    // ensure the action is correct
    const mnemonic = "verb reunion luggage nominee range can device shoe dial wealth palace seek";
    const create = createProfileAsyncAction.start(db, "new-secret", mnemonic, {});
    const { value } = await fixTypes(store.dispatch(create));
    const profile: UserProfile = value;
    expect(profile).not.toBeUndefined();
    const walletIds = profile.wallets.value.map(wallet => wallet.id);
    expect(walletIds.length).toEqual(1);
    const secret = profile.printableSecret(walletIds[0]);
    expect(secret).toEqual(mnemonic);

    // make sure the profile is set properly
    const after = store.getState();
    const storeProfile = after.profile.internal.profile;
    expect(storeProfile).not.toBeUndefined();
    expect(storeProfile!.wallets.value).toEqual(profile.wallets.value);
    const afterSecret = storeProfile!.printableSecret(walletIds[0]);
    expect(afterSecret).toEqual(mnemonic);
  });
});
