import { UserProfile } from "@iov/core";

import { createAction, createAsyncAction } from "typesafe-actions";
import { loadOrCreateProfile, StringDB } from "../../logic";

// export async function loadOrCreateProfile(db: StringDB, password: string): Promise<UserProfile> {

export const profileAsyncAction = createAsyncAction(
  "CREATE_PROFILE_PENDING",
  "CREATE_PROFILE_SUCCESS",
  "CREATE_PROFILE_REJECTED",
)<void, UserProfile, Error>();

type ExpectedType = typeof profileAsyncAction;

// tslint:disable-next-line:readonly-array
type PromiseCreator<P> = (...args: any[]) => Promise<P>;

const createActionFromPromise = <T1 extends string, T2 extends string, T3 extends string>(
  p: T1,
  s: T2,
  e: T3,
) => <P extends {}>(_: PromiseCreator<P>) => createAsyncAction(p, s, e)<void, P, Error>();

// this is how we handle return values
export const profilePromiseAction: ExpectedType = createActionFromPromise(
  "CREATE_PROFILE_PENDING",
  "CREATE_PROFILE_SUCCESS",
  "CREATE_PROFILE_REJECTED",
)(loadOrCreateProfile);

// this is how we trigger the action
export const loadProfileAction = createAction("CREATE_PROFILE", resolve => (db: StringDB, password: string) =>
  resolve(loadOrCreateProfile(db, password)),
);
type ExpectedAction = typeof loadProfileAction;

export interface ActionPayload<T, P> {
  readonly type: T;
  readonly payload: P;
}

// TODO: figure out how to use one-name with overloading....
export function funcToAction0<T extends string, R>(t: T, fn: () => R): () => ActionPayload<T, R> {
  return () => ({ type: t, payload: fn() });
}
export function funcToAction1<T extends string, A1, R>(
  t: T,
  fn: (a: A1) => R,
): (a: A1) => ActionPayload<T, R> {
  return (a: A1) => ({ type: t, payload: fn(a) });
}
export function funcToAction2<T extends string, A1, A2, R>(
  t: T,
  fn: (a: A1, b: A2) => R,
): (a: A1, b: A2) => ActionPayload<T, R> {
  return (a: A1, b: A2) => ({ type: t, payload: fn(a, b) });
}
export function funcToAction3<T extends string, A1, A2, A3, R>(
  t: T,
  fn: (a: A1, b: A2, c: A3) => R,
): (a: A1, b: A2, c: A3) => ActionPayload<T, R> {
  return (a: A1, b: A2, c: A3) => ({ type: t, payload: fn(a, b, c) });
}

export const autoLoadProfile: ExpectedAction = funcToAction2("CREATE_PROFILE", loadOrCreateProfile);
