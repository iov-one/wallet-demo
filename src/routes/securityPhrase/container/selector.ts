import { UserProfile } from "@iov/core";
import { createSelector, createStructuredSelector, Selector } from "reselect";
import { RootState } from "~/reducers";
import { getProfile } from "~/selectors";

export interface SelectorProps {
  readonly mnemonic: string | undefined;
}

const getWalletMnemonic: (state: RootState) => string | undefined = createSelector(
  getProfile,
  (profile: UserProfile | undefined) =>
    profile === undefined ? undefined : profile.printableSecret(profile.wallets.value[0].id),
);

const structuredSelector: Selector<RootState, SelectorProps> = createStructuredSelector({
  mnemonic: getWalletMnemonic,
});

export default structuredSelector;
