import { UserProfile } from "@iov/core";
import { createStructuredSelector, Selector } from "reselect";
import { StringDB } from "~/logic";
import { RootState } from "~/reducers";
import { getProfile, getProfileDB } from "~/selectors";

export interface SelectorProps {
  readonly db: StringDB;
  readonly profile: UserProfile | undefined;
}

const structuredSelector: Selector<RootState, SelectorProps> = createStructuredSelector({
  db: getProfileDB,
  profile: getProfile,
});

export default structuredSelector;
