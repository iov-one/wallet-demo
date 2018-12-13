import { ChainId } from "@iov/core";
import { createSelector, createStructuredSelector, Selector } from "reselect";
import { RootState } from "~/reducers";
import { ChainAccount, getMyAccounts } from "~/selectors";

export interface SelectorProps {
  readonly chainId: ChainId;
}

const chainIdSelector = createSelector(
  getMyAccounts,
  (accounts: ReadonlyArray<ChainAccount>) => {
    return accounts[0].chainId;
  }
)

const structuredSelector: Selector<RootState, SelectorProps> = createStructuredSelector({
  chainId: chainIdSelector,
});

export default structuredSelector;
