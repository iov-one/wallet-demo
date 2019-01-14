import { UserProfile } from "@iov/core";
import { createSelector, createStructuredSelector, Selector } from "reselect";
import { RootState } from "~/reducers";
import { ActiveIdentity } from "~/reducers/profile";
import { getActiveWallet, getProfile } from "~/selectors";

export interface SelectorProps {
  readonly mnemonic: string | undefined;
}

const getWalletMnemonic: (state: RootState) => string | undefined = createSelector(
  getProfile,
  getActiveWallet,
  (profile: UserProfile | undefined, wallet: ActiveIdentity | undefined) =>
    profile === undefined || wallet === undefined ? undefined : profile.printableSecret(wallet.walletId),
);

const structuredSelector: Selector<RootState, SelectorProps> = createStructuredSelector({
  mnemonic: getWalletMnemonic,
});

export default structuredSelector;
