import { PublicIdentity } from "@iov/bcp-types";
import { createSelector, createStructuredSelector, Selector } from "reselect";
import { StringDB } from "~/logic";
import { RootState } from "~/reducers";
import { AccountInfo } from "~/reducers/blockchain";
import { getAllIdentities, getBnsAccount, getProfileDB } from "~/selectors";

export interface SelectorProps {
  readonly db: StringDB;
  readonly hasIdentity: boolean;
  readonly accountName: string | undefined;
}

export const identitySelector = createSelector(
  getAllIdentities,
  (idents: ReadonlyArray<PublicIdentity>) => idents.length > 0,
);

export const dbSelector = createSelector(
  getProfileDB,
  (db: StringDB) => db,
);

export const accountNameSelector = createSelector(
  getBnsAccount,
  (account: AccountInfo | undefined) => (account ? account.username : undefined),
);

const structuredSelector: Selector<RootState, SelectorProps> = createStructuredSelector({
  db: dbSelector,
  hasIdentity: identitySelector,
  accountName: accountNameSelector,
});

export default structuredSelector;
