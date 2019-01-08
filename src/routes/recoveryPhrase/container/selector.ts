import { UserProfile } from "@iov/core";
import { createStructuredSelector, Selector } from "reselect";
import { RootState } from "~/reducers";
import { getProfile } from "~/selectors";

export interface SelectorProps {
  readonly profile: UserProfile | undefined;
}

const structuredSelector: Selector<RootState, SelectorProps> = createStructuredSelector({
  profile: getProfile,
});

export default structuredSelector;
