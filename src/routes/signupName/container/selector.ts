import { BnsConnection } from "@iov/bns";
import { createStructuredSelector, Selector } from "reselect";
import { RootState } from "~/reducers";
import { accountNameSelector, requireBnsConnection } from "~/selectors";

export interface SelectorProps {
  readonly connection: BnsConnection;
  readonly accountName: string | undefined;
}

const structuredSelector: Selector<RootState, SelectorProps> = createStructuredSelector({
  connection: requireBnsConnection,
  accountName: accountNameSelector,
});

export default structuredSelector;
