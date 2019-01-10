import { createStructuredSelector, Selector } from "reselect";
import { RootState } from "~/reducers";
import { accountNameSelector } from "~/routes/home/container/selector";

export interface SelectorProps {
  readonly accountName: string | undefined;
}

const structuredSelector: Selector<RootState, SelectorProps> = createStructuredSelector({
  accountName: accountNameSelector,
});

export default structuredSelector;
