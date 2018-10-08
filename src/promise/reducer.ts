import { ActionType } from "typesafe-actions";

import * as actions from "./actions";
import { Job, User } from "./state";

type PromiseAction = ActionType<typeof actions>;
// type JobAction = ActionType<typeof actions.fetchJobs>;

interface State {
  readonly jobs: ReadonlyArray<Job>;
  readonly users: ReadonlyArray<User>;
  readonly error?: Error;
  readonly inProgress: boolean;
}

const done = (error?: Error) => ({
  error: error,
  inProgress: false,
});

export function reducer(
  state: State = { jobs: [], users: [], inProgress: false },
  action: PromiseAction,
): State {
  switch (action.type) {
    // separate line for each success
    case "FETCH_USERS_FULFILLED":
      return { ...state, ...done(), users: action.payload };
    case "FETCH_JOBS_FULFILLED":
      return { ...state, ...done(), jobs: action.payload };

    // repeat for each rejected...
    case "FETCH_USERS_REJECTED":
    case "FETCH_JOBS_REJECTED":
      return { ...state, ...done(action.payload) };

    // repeat for each pending...
    case "FETCH_JOBS_PENDING":
      return { ...state, inProgress: true };

    // or just use this for anything else since we don't care mostly....
    default:
      return state;
  }
}
