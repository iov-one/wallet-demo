import { createStructuredSelector, Selector } from "reselect";
import { StringDB } from "~/logic";
import { RootState } from "~/reducers";
import { getProfileDB } from "~/selectors";

export interface SelectorProps {
  readonly db: StringDB;
}

const structuredSelector: Selector<RootState, SelectorProps> = createStructuredSelector({
  db: getProfileDB,
});

export default structuredSelector;
