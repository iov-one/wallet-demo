import { UserProfile } from "@iov/core";
import { WalletInfo } from "@iov/keycontrol";
import { createSelector, createStructuredSelector, Selector } from "reselect";
import { RootState } from "~/reducers";
import { getProfile } from "~/selectors";

export interface SelectorProps {
  readonly profile: UserProfile | undefined;
  readonly wallet: WalletInfo | undefined;
  readonly mnemonic: string | undefined;
}

const getProfileWallet: (state: RootState) => WalletInfo | undefined = createSelector(
  getProfile,
  (profile: UserProfile | undefined) => (profile === undefined ? undefined : profile.wallets.value[0]),
);

const getWalletMnemonic: (state: RootState) => string | undefined = createSelector(
  getProfile,
  getProfileWallet,
  (profile: UserProfile | undefined, wallet: WalletInfo | undefined) =>
    profile === undefined || wallet === undefined ? undefined : profile.printableSecret(wallet.id),
);

const structuredSelector: Selector<RootState, SelectorProps> = createStructuredSelector({
  profile: getProfile,
  wallet: getProfileWallet,
  mnemonic: getWalletMnemonic,
});

export default structuredSelector;
