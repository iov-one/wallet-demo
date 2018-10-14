import { UserProfile } from "@iov/core";

import { /*createAction,*/ createAsyncAction } from "typesafe-actions";

// export async function loadOrCreateProfile(db: StringDB, password: string): Promise<UserProfile> {

export const profileAsyncAction = createAsyncAction(
  "CREATE_PROFILE_PENDING",
  "CREATE_PROFILE_SUCCESS",
  "CREATE_PROFILE_REJECTED",
)<void, UserProfile, Error>();

type ExpectedType = typeof profileAsyncAction;

// tslint:disable-next-line:readonly-array
// type PromiseCreator<P> = (...args: any[]) => Promise<P>;

const createActionFromPromise = <T1 extends string, T2 extends string, T3 extends string>(
  p: T1,
  s: T2,
  e: T3,
) => <P extends {}>() => createAsyncAction(p, s, e)<void, P, Error>();

export const profilePromiseAction: ExpectedType = createActionFromPromise(
  "CREATE_PROFILE_PENDING",
  "CREATE_PROFILE_SUCCESS",
  "CREATE_PROFILE_REJECTED",
)<UserProfile>();
