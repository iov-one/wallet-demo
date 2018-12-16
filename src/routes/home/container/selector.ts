import { LocalIdentity } from "@iov/keycontrol";
import { createSelector, createStructuredSelector, Selector } from "reselect";
import { StringDB } from "~/logic";
import { RootState } from "~/reducers";
import { getActiveIdentity, getProfileDB } from "~/selectors";

export interface SelectorProps {
  readonly db: StringDB;
  readonly hasIdentity: boolean;
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
