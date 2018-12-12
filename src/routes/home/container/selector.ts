import { createStructuredSelector, createSelector, Selector } from "reselect";
import { getActiveIdentity, getProfileDB } from "~/selectors";
import { LocalIdentity } from "@iov/keycontrol";
import { StringDB } from "~/logic";
import { RootState } from "~/reducers";

export interface SelectorProps {
  db: StringDB;
  hasIdentity: boolean;
}

export const identitySelector = createSelector(
  getActiveIdentity,
  (localIdentity: LocalIdentity | undefined) => !!localIdentity,
);

export const dbSelector = createSelector(
  getProfileDB,
  (db: StringDB) => db,
);

const structuredSelector: Selector<RootState, SelectorProps> = createStructuredSelector({
  db: dbSelector,
  hasIdentity: identitySelector,
});

export default structuredSelector;
