// tslint:disable:no-unused-expression
import { expect } from "chai";
import "mocha";

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
    expect(action.type).to.equal("GET_ACTIVE_IDENTITY");
    expect(action.payload.walletId).not.to.be.undefined;
    expect(action.payload.identity).not.to.be.undefined;

    const init = store.getState();
    expect(init.profile.activeIdentity).to.be.undefined;
    fixTypes(store.dispatch(action));

    const after = store.getState();
    expect(after.profile.activeIdentity).not.to.be.undefined;
    expect(after.profile.activeIdentity!.walletId).to.equal(action.payload.walletId);
  });

  it("initializes a fresh redux store", async () => {
    const store = makeStore();
    const init = store.getState();
    expect(init.profile.internal.profile).to.be.undefined;
    expect(init.profile.internal.db).not.to.be.undefined;
    //   const db = init.profile.internal.db;
    const db = createMemDb();

    // ensure the action is correct
    const create = createProfileAsyncAction.start(db, "my-secret-here", {});
    expect(create.type).to.equal("CREATE_PROFILE");
    expect(create.payload.then).not.to.be.undefined;

    // dispatch and check out the return values
    // NOTE: this is not properly captured by the type-system!

    const { action, value } = await fixTypes(store.dispatch(create));
    expect(action.type).to.equal("CREATE_PROFILE_FULFILLED");
    const profile: UserProfile = value;
    expect(profile).not.to.be.undefined;

    // make sure the profile is set properly
    const after = store.getState();
    const storeProfile = after.profile.internal.profile;
    expect(storeProfile).not.to.be.undefined;
    expect(storeProfile!.wallets.value).to.equal(profile.wallets.value);
  });
});
