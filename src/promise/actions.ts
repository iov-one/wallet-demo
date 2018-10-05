import { createAction, createAsyncAction, createStandardAction } from "typesafe-actions";

import { Job, User } from "./state";

export const fetchUsers = createAsyncAction(
  "FETCH_USERS_PENDING",
  "FETCH_USERS_FULFILLED",
  "FETCH_USERS_REJECTED",
)<void, ReadonlyArray<User>, Error>();

export const fetchJobsPending = createAction("FETCH_JOBS_PENDING");
export const fetchJobsFulfilled = createStandardAction("FETCH_JOBS_FULFILLED")<ReadonlyArray<Job>>();
export const fetchJobsRejected = createStandardAction("FETCH_JOBS_REJECTED")<Error>();
