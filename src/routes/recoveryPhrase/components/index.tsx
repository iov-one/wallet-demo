import { UserProfile } from "@iov/core";
import { WalletInfo } from "@iov/keycontrol";
import * as React from "react";
import OneColumn from "./OneColumn";
import PageTitle from "./PageTitle";
import RecoveryPhrase from "./RecoveryPhrase";

interface Props {
  readonly profile: UserProfile;
  readonly wallet: WalletInfo;
}

export default ({ profile, wallet }: Props): JSX.Element => {
  return (
    <OneColumn>
      <PageTitle />
      <RecoveryPhrase phrase={profile.printableSecret(wallet.id)} />
    </OneColumn>
  );
};
