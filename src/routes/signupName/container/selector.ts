import { BnsConnection } from "@iov/bns";
import { ChainId } from "@iov/core";
import { createSelector, createStructuredSelector, Selector } from "reselect";
import { StringDB } from "~/logic";
import { RootState } from "~/reducers";
import { accountNameSelector, dbSelector, identitySelector } from "~/routes/home/container/selector";
import { getChainIds, requireBnsConnection } from "~/selectors";

export interface SelectorProps {
  readonly chainId: ChainId;
  readonly connection: BnsConnection;
  readonly db: StringDB;
  readonly hasIdentity: boolean;
  readonly accountName: string | undefined;
}

const chainIdSelector = createSelector(
  getChainIds,
  (chainIds: ReadonlyArray<ChainId>) => {
    return chainIds[0];
  },
);

const structuredSelector: Selector<RootState, SelectorProps> = createStructuredSelector({
  chainId: chainIdSelector,
  connection: requireBnsConnection,
  db: dbSelector,
  hasIdentity: identitySelector,
  accountName: accountNameSelector,
});

export default structuredSelector;
