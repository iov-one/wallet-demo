import { PublicIdentity } from "@iov/bcp-types";
import { createSelector, createStructuredSelector, Selector } from "reselect";
import { StringDB } from "~/logic";
import { RootState } from "~/reducers";
import { AccountInfo } from "~/reducers/blockchain";
import { getActiveIdentity, getMyAccounts, getProfileDB } from "~/selectors";

export interface SelectorProps {
  readonly db: StringDB;
  readonly hasIdentity: boolean;
  readonly accountName: string | undefined;
}

export const identitySelector = createSelector(
  getActiveIdentity,
  (localIdentity: PublicIdentity | undefined) => !!localIdentity,
);

export const dbSelector = createSelector(
  getProfileDB,
  (db: StringDB) => db,
);

export const accountNameSelector = createSelector(
  getMyAccounts,
  (accounts: ReadonlyArray<AccountInfo>) => {
    if (accounts.length === 0) {
      return undefined;
    }
    return accounts[0].username;
  },
);

const structuredSelector: Selector<RootState, SelectorProps> = createStructuredSelector({
  db: dbSelector,
  hasIdentity: identitySelector,
  accountName: accountNameSelector,
});

export default structuredSelector;
