/* Some middleware changes the return type of store Dispatch...
 * This makes type completion on the results annoying.
 * 
 * Here is a wrapper that undoes Promise and Thunk middlewares. 
 */

interface Action<T, P> {
  readonly type: T;
  readonly payload: P;
}
type PromisedAction<T, P> = Action<T, Promise<P>>;

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
type ThunkAction<T, P> = Action<T, (...args: any[]) => P>;
export function unthunk<T extends string, P>(result: ThunkAction<T, P>): Action<T, P> {
  return (result as any) as Action<T, P>;
}
