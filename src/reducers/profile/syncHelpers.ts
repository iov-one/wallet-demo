import { Fn, Fn0, Fn1, Fn2, Fn3, isFn0, isFn1, isFn2 } from "./functions";

// this is how we trigger the action
export interface ActionPayload<T, P> {
  readonly type: T;
  readonly payload: P;
}

// one-heavily overloaded function
export function funcToAction<T extends string, R>(t: T, fn: Fn0<R>): Fn0<ActionPayload<T, R>>;
export function funcToAction<T extends string, A1, R>(t: T, fn: Fn1<R, A1>): Fn1<ActionPayload<T, R>, A1>;
export function funcToAction<T extends string, A1, A2, R>(
  t: T,
  fn: Fn2<R, A1, A2>,
): Fn2<ActionPayload<T, R>, A1, A2>;
export function funcToAction<T extends string, A1, A2, A3, R>(
  t: T,
  fn: Fn3<R, A1, A2, A3>,
): Fn3<ActionPayload<T, R>, A1, A2, A3>;
export function funcToAction<T extends string, R, A1, A2, A3>(
  t: T,
  fn: Fn<R, A1, A2, A3>,
): Fn<ActionPayload<T, R>, A1, A2, A3> {
  if (isFn0(fn)) {
    return () => ({ type: t, payload: fn() });
  } else if (isFn1(fn)) {
    return (a: A1) => ({ type: t, payload: fn(a) });
  } else if (isFn2(fn)) {
    return (a: A1, b: A2) => ({ type: t, payload: fn(a, b) });
  } else {
    return (a: A1, b: A2, c: A3) => ({ type: t, payload: fn(a, b, c) });
  }
}
