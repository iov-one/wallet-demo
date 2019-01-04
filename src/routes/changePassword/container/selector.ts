import { UserProfile } from "@iov/core";
import { createStructuredSelector, Selector } from "reselect";
import { StringDB } from "~/logic";
import { RootState } from "~/reducers";
import { dbSelector } from "~/routes/home/container/selector";
import { getProfile } from "~/selectors";

export interface SelectorProps {
  readonly db: StringDB;
  readonly profile: UserProfile | undefined;
}

const structuredSelector: Selector<RootState, SelectorProps> = createStructuredSelector({
  db: dbSelector,
  profile: getProfile,
});

export default structuredSelector;
