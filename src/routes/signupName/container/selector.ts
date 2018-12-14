import { BcpConnection } from "@iov/bcp-types";
import { ChainId } from "@iov/core";
import { createSelector, createStructuredSelector, Selector } from "reselect";
import { StringDB } from "~/logic";
import { RootState } from "~/reducers";
import { dbSelector, identitySelector } from "~/routes/home/container/selector";
import { ChainAccount, getChainIds, getConnections, getMyAccounts } from "~/selectors";

export interface SelectorProps {
  readonly chainId: ChainId;
  readonly connection: BcpConnection;
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

const connectionSelector = createSelector(
  chainIdSelector,
  getConnections,
  (chainId: ChainId, connections: { readonly [chainId: string]: BcpConnection }): BcpConnection =>
    connections[chainId],
);

const accountNameSelector = createSelector(
  getMyAccounts,
  (accounts: ReadonlyArray<ChainAccount>) => {
    if (accounts.length === 0) {
      return undefined;
    }

    const account = accounts[0];

    return account.account ? account.account.name : undefined;
  },
);

const structuredSelector: Selector<RootState, SelectorProps> = createStructuredSelector({
  chainId: chainIdSelector,
  connection: connectionSelector,
  db: dbSelector,
  hasIdentity: identitySelector,
  accountName: accountNameSelector,
});

export default structuredSelector;
