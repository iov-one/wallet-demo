/* Some middleware changes the return type of store Dispatch...
 * This makes type completion on the results annoying.
 * 
 * Here is a wrapper that undoes Promise and Thunk middlewares. 
 */

import { Action } from "redux";

interface SyncAction<T, P> extends Action<T> {
  readonly payload: P;
}
interface PromisedAction<T, P> extends Action<T> {
  readonly payload: Promise<P>;
}
interface ThunkAction<T, P> extends Action<T> {
  // tslint:disable-next-line:readonly-array
  readonly payload: (...args: any[]) => P;
}
export type StdAction<T, P> = SyncAction<T, P> | PromisedAction<T, P> | ThunkAction<T, P>;

export interface PromisedResult<T, P> {
  readonly value: P;
  readonly action: {
    readonly type: T;
    readonly payload: P;
  };
}

function isPromisedAction<T, P>(action: StdAction<T, P>): action is PromisedAction<T, P> {
  const value = action.payload;
  return !!value && typeof value === "object" && typeof (value as any).then === "function";
}
function isThunkAction<T, P>(action: StdAction<T, P>): action is ThunkAction<T, P> {
  const value = action.payload;
  return !!value && typeof value === "function";
}

export function fixTypes<T, P>(result: PromisedAction<T, P>): Promise<PromisedResult<string, P>>;
export function fixTypes<T, P>(result: ThunkAction<T, P> | SyncAction<T, P>): SyncAction<T, P>;
export function fixTypes<T, P>(
  result: StdAction<T, P>,
): SyncAction<T, P> | Promise<PromisedResult<string, P>> {
  if (isPromisedAction(result)) {
    return (result as any) as Promise<PromisedResult<string, P>>;
  } else if (isThunkAction(result)) {
    return (result as any) as SyncAction<T, P>;
  } else {
    return result;
  }
}
