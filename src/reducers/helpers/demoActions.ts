import { ActionType, createAction, createAsyncAction } from "typesafe-actions";

import { ChainId, UserProfile } from "@iov/core";

import { loadOrCreateProfile, StringDB } from "../../logic";
import { createPromiseAction, createSyncAction } from "./actions";

/****** sync demo **************/

// "old" way to do this
export const loadProfileAction = createAction(
  "CREATE_PROFILE",
  resolve => (chainId: ChainId, db: StringDB, password: string, mnemonic?: string) =>
    resolve(loadOrCreateProfile(chainId, db, password, mnemonic)),
);
type ExpectedAction = typeof loadProfileAction;
// more automatic promise-wrapping with type-pass-through is equivalent
export const autoLoadProfile: ExpectedAction = createSyncAction("CREATE_PROFILE", loadOrCreateProfile);

// trial with typescript
const actions = { autoLoadProfile };
type SyncAction = ActionType<typeof actions>;
export function foo(act: SyncAction): void {
  switch (act.type) {
    case "CREATE_PROFILE":
      console.log("YES");
      break;
    default:
      console.log(`What? ${act.type}`);
  }
}

/**** demo *****/

// this was older way
const profileAsyncAction = createAsyncAction(
  "CREATE_PROFILE_PENDING",
  "CREATE_PROFILE_SUCCESS",
  "CREATE_PROFILE_REJECTED",
)<void, UserProfile, Error>();
type ExpectedType = typeof profileAsyncAction;

// this is custom code to generate whole promise-middleware sequence from one promise
export const profilePromiseAction = createPromiseAction(
  "CREATE_PROFILE",
  "CREATE_PROFILE_PENDING",
  "CREATE_PROFILE_SUCCESS",
  "CREATE_PROFILE_REJECTED",
)(loadOrCreateProfile);

export const compat: ExpectedType = profilePromiseAction;

// trial with typescript
type AsyncAction = ActionType<typeof profilePromiseAction>;
export function bar(act: AsyncAction): void {
  switch (act.type) {
    case "CREATE_PROFILE_SUCCESS":
      // act.payload.addEntry();
      console.log("YES");
      break;
    case "CREATE_PROFILE":
      // act.payload.then(x => 0);
      console.log("YES");
      break;
    default:
      console.log(`What? ${act.type}`);
  }
}
