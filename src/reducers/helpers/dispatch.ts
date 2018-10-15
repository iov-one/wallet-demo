/* Some middleware changes the return type of store Dispatch...
 * This makes type completion on the results annoying.
 * 
 * Here is a wrapper that undoes Promise and Thunk middlewares. 
 */

import { Action } from "redux";

interface StdAction<T, P> extends Action<T> {
    readonly payload: P;
}
type PromisedAction<T, P> = StdAction<T, Promise<P>>;

export interface PromisedResult<T, P> {
  readonly value: P;
  readonly action: {
    readonly type: T;
    readonly payload: P;
  };
}

// unpromisify will take the result from redux-promise-middleware and
// assign the proper type to it.
// note that the action type changes (append _FULFILLED), so we can expand type to string
export function unpromisify<P>(result: PromisedAction<string, P>): Promise<PromisedResult<string, P>> {
  return (result as any) as Promise<PromisedResult<string, P>>;
}

// tslint:disable-next-line:readonly-array
type ThunkAction<T, P> = StdAction<T, (...args: any[]) => P>;

export function unthunk<T extends string, P>(result: ThunkAction<T, P>): StdAction<T, P> {
  return (result as any) as StdAction<T, P>;
}

function isPromisedAction<T, P>(action: StdAction<T, P>): action is PromisedAction<T, P> {
    const value = action.payload;
    return (!!value && typeof value === 'object' && typeof (value as any).then === 'function');
}

export function typeCheck<T, P>(result: PromisedAction<T, P>): Promise<PromisedResult<string, P>>;
export function typeCheck<T, P>(result: ThunkAction<T, P>): StdAction<T, P>;
export function typeCheck<T, P>(result: StdAction<T, P>): StdAction<T, P> | Promise<PromisedResult<string, P>> {

    return (result as any) as Promise<PromisedResult<string, P>>;
  }
  