import { createStructuredSelector, Selector } from "reselect";
import { confirmedTxSelector } from "~/components/Header/selector";
import { RootState } from "~/reducers";
import { ProcessedTx } from "~/store/notifications/state";

export interface SelectorProps {
  readonly txs: ReadonlyArray<ProcessedTx>;
}

const structuredSelector: Selector<RootState, SelectorProps> = createStructuredSelector({
  txs: confirmedTxSelector,
});

export default structuredSelector;
