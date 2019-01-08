import { UserProfile } from "@iov/core";

import { createMemDb, loadOrCreateProfile } from "../../logic";
import { makeStore } from "../../store";
import { fixTypes } from "../helpers";
import { createProfileAsyncAction, getIdentityAction } from "./actions";

describe("profile async actions", () => {
  it("stores get_identity results", async () => {
    const store = makeStore();
    const db = createMemDb();
    const profile = await loadOrCreateProfile(db, "my-secret-here");

    const action = getIdentityAction(profile);
    expect(action.type).toEqual("GET_ACTIVE_IDENTITY");
    expect(action.payload.walletId).not.toBeUndefined();
    expect(action.payload.identity).not.toBeUndefined();

    const init = store.getState();
    expect(init.profile.activeIdentity).toBeUndefined();
    fixTypes(store.dispatch(action));

    const after = store.getState();
    expect(after.profile.activeIdentity).not.toBeUndefined();
    expect(after.profile.activeIdentity!.walletId).toEqual(action.payload.walletId);
  });

  it("initializes a fresh redux store", async () => {
    const store = makeStore();
    const init = store.getState();
    expect(init.profile.internal.profile).toBeUndefined();
    expect(init.profile.internal.db).not.toBeUndefined();
    //   const db = init.profile.internal.db;
    const db = createMemDb();

    // ensure the action is correct
    const create = createProfileAsyncAction.start(db, "my-secret-here", undefined);
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
});
