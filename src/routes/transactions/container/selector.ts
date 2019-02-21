import { createStructuredSelector, Selector } from "reselect";
import { RootState } from "~/reducers";
import { getTransactions } from "~/store/notifications/selectors";
import { ProcessedTx } from "~/store/notifications/state";

export interface SelectorProps {
  readonly txs: ReadonlyArray<ProcessedTx>;
}

const structuredSelector: Selector<RootState, SelectorProps> = createStructuredSelector({
  txs: getTransactions,
});

export default structuredSelector;
