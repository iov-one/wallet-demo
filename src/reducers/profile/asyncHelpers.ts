import { Fn } from "./functions";
import { funcToAction } from "./syncHelpers";

// tslint:disable-next-line:no-empty
function voidFunc(): void {}

export type PromiseFn<P, A1, A2, A3> = Fn<Promise<P>, A1, A2, A3>;
export const createActionFromPromise = <
  T0 extends string,
  T1 extends string,
  T2 extends string,
  T3 extends string
>(
  send: T0,
  pend: T1,
  suc: T2,
  err: T3,
) => <P, A1, A2, A3>(fn: PromiseFn<P, A1, A2, A3>) => ({
  sending: funcToAction(send, fn),
  request: funcToAction(pend, voidFunc),
  success: funcToAction(suc, (p: P) => p),
  failure: funcToAction(err, (e: Error) => e),
});
