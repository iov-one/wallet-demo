import * as React from "react";
import { connect } from "react-redux";
import { MatchMediaContext } from "~/context/MatchMediaContext";
import Layout from "./components";
import selector, { SelectorProps } from "./selector";

class Header extends React.Component<SelectorProps> {
  public render(): JSX.Element {
    const { pendingTxs, txs } = this.props;

    return (
      <MatchMediaContext.Consumer>
        {phone => <Layout phoneMode={phone} pendingTxs={pendingTxs} txs={txs} />}
      </MatchMediaContext.Consumer>
    );
  }
}

export default connect(selector)(Header);
