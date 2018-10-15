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
export function unpromisify<T extends string, P>(
  result: PromisedAction<T, P>,
): Promise<PromisedResult<T, P>> {
  return (result as any) as Promise<PromisedResult<T, P>>;
}
