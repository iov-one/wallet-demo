import * as React from "react";
import { connect } from "react-redux";
import ProfileNotFound from "../components/ProfileNotFound";
import ShowMnemonic from "../components/ShowMnemonic";
import selectors, { SelectorProps } from "./selector";

class RecoveryPhrase extends React.Component<SelectorProps> {
  public render(): JSX.Element {
    const { profile, wallet, mnemonic } = this.props;

    if (profile && wallet && mnemonic) {
      return <ShowMnemonic phrase={mnemonic} />;
    } else {
      return <ProfileNotFound /> 
    }
  }
}

export default connect(selectors)(RecoveryPhrase);
