import * as React from "react";
import { connect } from "react-redux";
import Layout from "./components";
import selector, { SelectorProps } from "./selector";

class Header extends React.Component<SelectorProps> {
  public render(): JSX.Element {
    const { pendingTxs, txs } = this.props;

    return (
      <React.Fragment>
        <Layout pendingTxs={pendingTxs} txs={txs} />
        <div id="headerPhone" />
      </React.Fragment>
    );
  }
}

export default connect(selector)(Header);
