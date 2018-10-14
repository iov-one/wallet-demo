import { UserProfile } from "@iov/core";

import { createAsyncAction } from "typesafe-actions";

import { loadOrCreateProfile } from "../../logic";

import { Fn } from "./functions";
import { funcToAction } from "./syncHelpers";

export type PromiseFn<P, A1, A2, A3> = Fn<Promise<P>, A1, A2, A3>;

// tslint:disable-next-line:no-empty
function voidFunc(): void {}

export const createActionFromPromise = <T1 extends string, T2 extends string, T3 extends string>(
  //   req: T0,
  pend: T1,
  suc: T2,
  err: T3,
) => <P, A1, A2, A3>(_: PromiseFn<P, A1, A2, A3>) => ({
  request: funcToAction(pend, voidFunc),
  success: funcToAction(suc, (p: P) => p),
  failure: funcToAction(err, (e: Error) => e),
});

/**** demo *****/
export const profileAsyncAction = createAsyncAction(
  "CREATE_PROFILE_PENDING",
  "CREATE_PROFILE_SUCCESS",
  "CREATE_PROFILE_REJECTED",
)<void, UserProfile, Error>();
type ExpectedType = typeof profileAsyncAction;

// this is how we handle return values
export const profilePromiseAction: ExpectedType = createActionFromPromise(
  "CREATE_PROFILE_PENDING",
  "CREATE_PROFILE_SUCCESS",
  "CREATE_PROFILE_REJECTED",
)(loadOrCreateProfile);
