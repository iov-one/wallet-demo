import * as React from "react";
import { connect } from "react-redux";
import { MatchMediaContext } from "~/context/MatchMediaContext";
import DesktopHeader from "./DesktopHeader";
import PhoneHeader from "./PhoneHeader";
import selector, { SelectorProps } from "./selector";

class Header extends React.Component<SelectorProps> {
  public render(): JSX.Element {
    const { pendingTxs, txs } = this.props;

    return (
      <MatchMediaContext.Consumer>
        {phone => (phone ? <PhoneHeader /> : <DesktopHeader pendingTxs={pendingTxs} txs={txs} />)}
      </MatchMediaContext.Consumer>
    );
  }
}

export default connect(selector)(Header);
