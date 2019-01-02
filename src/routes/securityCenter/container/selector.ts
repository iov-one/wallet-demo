import { createStructuredSelector, Selector } from "reselect";
import { StringDB } from "~/logic";
import { RootState } from "~/reducers";
import { dbSelector } from "~/routes/home/container/selector";

export interface SelectorProps {
  readonly db: StringDB;
}

const structuredSelector: Selector<RootState, SelectorProps> = createStructuredSelector({
  db: dbSelector,
});

export default structuredSelector;
