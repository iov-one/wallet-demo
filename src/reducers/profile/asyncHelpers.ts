import { UserProfile } from "@iov/core";

import { ActionType, createAsyncAction } from "typesafe-actions";

import { loadOrCreateProfile } from "../../logic";

import { Fn } from "./functions";
import { funcToAction } from "./syncHelpers";


// tslint:disable-next-line:no-empty
function voidFunc(): void {}

export type PromiseFn<P, A1, A2, A3> = Fn<Promise<P>, A1, A2, A3>;
export const createActionFromPromise = <T0 extends string, T1 extends string, T2 extends string, T3 extends string>(
  send : T0,
  pend: T1,
  suc: T2,
  err: T3,
) => <P, A1, A2, A3>(fn: PromiseFn<P, A1, A2, A3>) => ({
  sending: funcToAction(send, fn),
  request: funcToAction(pend, voidFunc),
  success: funcToAction(suc, (p: P) => p),
  failure: funcToAction(err, (e: Error) => e),
});

/**** demo *****/
export const profileAsyncAction = createAsyncAction(
  "CREATE_PROFILE_PENDING",
  "CREATE_PROFILE_SUCCESS",
  "CREATE_PROFILE_REJECTED",
)<void, UserProfile, Error>();
// type ExpectedType = typeof profileAsyncAction;

// this is how we handle return values
export const profilePromiseAction = createActionFromPromise(
  "CREATE_PROFILE",
  "CREATE_PROFILE_PENDING",
  "CREATE_PROFILE_SUCCESS",
  "CREATE_PROFILE_REJECTED",
)(loadOrCreateProfile);

// trial with typescript
// type Action = ActionType<typeof profilePromiseAction>;
// export function foo(act: Action): void {
//     switch(act.type) {
//         case "CREATE_PROFILE_SUCCESS":
//         // act.payload.addEntry();
//         console.log("YES");
//         break;
//         case "CREATE_PROFILE":
//         // act.payload.then(x => 0);
//         console.log("YES");
//         break;
//         default:
//         console.log(`What? ${act.type}`);
//     }
// };

