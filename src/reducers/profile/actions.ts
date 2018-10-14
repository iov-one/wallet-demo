import { UserProfile } from "@iov/core";

import { createAsyncAction } from "typesafe-actions";

import { loadOrCreateProfile } from "../../logic";


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


// export function funcToAction0<T extends string, R>(t: T, fn: Fn0<R>): Fn0<ActionPayload<T, R>> {
//   return () => ({ type: t, payload: fn() });
// }
// export function funcToAction1<T extends string, A1, R>(t: T, fn: Fn1<R, A1>): Fn1<ActionPayload<T, R>, A1> {
//   return (a: A1) => ({ type: t, payload: fn(a) });
// }
// export function funcToAction2<T extends string, A1, A2, R>(
//   t: T,
//   fn: Fn2<R, A1, A2>,
// ): Fn2<ActionPayload<T, R>, A1, A2> {
//   return (a: A1, b: A2) => ({ type: t, payload: fn(a, b) });
// }
// export function funcToAction3<T extends string, A1, A2, A3, R>(
//   t: T,
//   fn: Fn3<R, A1, A2, A3>,
// ): Fn3<ActionPayload<T, R>, A1, A2, A3> {
//   return (a: A1, b: A2, c: A3) => ({ type: t, payload: fn(a, b, c) });
// }

// const fullPromiseAction = <T0 extends string, T1 extends string, T2 extends string, T3 extends string>(
//     req: T0,
//     p: T1,
//     s: T2,
//     e: T3,
//   ) => <P extends {}>(_: PromiseCreator<P>) => createAsyncAction(p, s, e)<void, P, Error>();
