// function helpers
export type Fn0<R> = () => R;
export type Fn1<R, A1> = (a: A1) => R;
export type Fn2<R, A1, A2> = (a: A1, b: A2) => R;
export type Fn3<R, A1, A2, A3> = (a: A1, b: A2, c: A3) => R;
export type Fn<R, A1 = undefined, A2 = undefined, A3 = undefined> =
  | Fn0<R>
  | Fn1<R, A1>
  | Fn2<R, A1, A2>
  | Fn3<R, A1, A2, A3>;

export function isFn0<R, A1, A2, A3>(fn: Fn<R, A1, A2, A3>): fn is Fn0<R> {
  return fn.length === 0;
}
export function isFn1<R, A1, A2, A3>(fn: Fn<R, A1, A2, A3>): fn is Fn1<R, A1> {
  return fn.length === 1;
}
export function isFn2<R, A1, A2, A3>(fn: Fn<R, A1, A2, A3>): fn is Fn2<R, A1, A2> {
  return fn.length === 2;
}
export function isFn3<R, A1, A2, A3>(fn: Fn<R, A1, A2, A3>): fn is Fn3<R, A1, A2, A3> {
  return fn.length === 3;
}
