import { BnsConnection } from "@iov/bns";
import { createStructuredSelector, Selector } from "reselect";
import { RootState } from "~/reducers";
import { requireBnsConnection } from "~/selectors";
import { getTransactions } from "~/store/notifications/selectors";
import { ProcessedTx } from "~/store/notifications/state";

export interface SelectorProps {
  readonly txs: ReadonlyArray<ProcessedTx>;
  readonly connection: BnsConnection;
}

const structuredSelector: Selector<RootState, SelectorProps> = createStructuredSelector({
  txs: getTransactions,
  connection: requireBnsConnection,
});

export default structuredSelector;
