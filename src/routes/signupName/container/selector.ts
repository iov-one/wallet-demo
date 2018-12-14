import { BcpConnection } from "@iov/bcp-types";
import { ChainId } from "@iov/core";
import { createSelector, createStructuredSelector, Selector } from "reselect";
import { StringDB } from "~/logic";
import { RootState } from "~/reducers";
import { dbSelector, identitySelector } from "~/routes/home/container/selector";
import { getChainIds, getConnections } from "~/selectors";

export interface SelectorProps {
  readonly chainId: ChainId;
  readonly connection: BcpConnection;
  readonly db: StringDB;
  readonly hasIdentity: boolean;
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

const structuredSelector: Selector<RootState, SelectorProps> = createStructuredSelector({
  chainId: chainIdSelector,
  connection: connectionSelector,
  db: dbSelector,
  hasIdentity: identitySelector,
});

export default structuredSelector;
