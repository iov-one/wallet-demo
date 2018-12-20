import { LocalIdentity } from "@iov/keycontrol";
import { createSelector, createStructuredSelector, Selector } from "reselect";
import { StringDB } from "~/logic";
import { RootState } from "~/reducers";
import { ChainAccount, getActiveIdentity, getMyAccounts, getProfileDB } from "~/selectors";

export interface SelectorProps {
  readonly db: StringDB;
  readonly hasIdentity: boolean;
  readonly accountName: string | undefined;
}

export const identitySelector = createSelector(
  getActiveIdentity,
  (localIdentity: LocalIdentity | undefined) => !!localIdentity,
);

export const dbSelector = createSelector(
  getProfileDB,
  (db: StringDB) => db,
);

export const accountNameSelector = createSelector(
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
  db: dbSelector,
  hasIdentity: identitySelector,
  accountName: accountNameSelector,
});

export default structuredSelector;
