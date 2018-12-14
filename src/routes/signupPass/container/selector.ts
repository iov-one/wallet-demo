import { createStructuredSelector, Selector } from "reselect";
import { StringDB } from "~/logic";
import { RootState } from "~/reducers";
import { dbSelector, identitySelector } from "~/routes/home/container/selector";

export interface SelectorProps {
  readonly db: StringDB;
  readonly hasIdentity: boolean;
}

const structuredSelector: Selector<RootState, SelectorProps> = createStructuredSelector({
  db: dbSelector,
  hasIdentity: identitySelector,
});

export default structuredSelector;
