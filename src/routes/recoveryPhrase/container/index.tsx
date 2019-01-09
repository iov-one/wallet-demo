import * as React from "react";
import { connect } from "react-redux";
import PageMenuColumn from "~/components/pages/PageMenuColumn";
import PageTitle from "../components/PageTitle";
import ProfileNotFound from "../components/ProfileNotFound";
import ShowMnemonic from "../components/ShowMnemonic";
import selectors, { SelectorProps } from "./selector";

class RecoveryPhrase extends React.Component<SelectorProps> {
  public render(): JSX.Element {
    const { profile, wallet, mnemonic } = this.props;

    return (
      <PageMenuColumn phoneFullWidth>
        <PageTitle />
        {profile && wallet && mnemonic ? <ShowMnemonic phrase={mnemonic} /> : <ProfileNotFound />}
      </PageMenuColumn>
    );
  }
}

export default connect(selectors)(RecoveryPhrase);
