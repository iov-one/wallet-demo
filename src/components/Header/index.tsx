import * as React from "react";
import { connect } from "react-redux";
import { MatchMediaContext } from "~/context/MatchMediaContext";
import { LOGIN_ROUTE } from "~/routes";
import { history } from "~/store";
import actions, { LogoutProfileActions } from "./actions";
import Layout from "./components";
import selector, { SelectorProps } from "./selector";

interface Props extends SelectorProps, LogoutProfileActions {}

class Header extends React.Component<Props> {
  public readonly logoutProfile = async (): Promise<void> => {
    await this.props.logoutProfile();
    history.push(LOGIN_ROUTE);
  };
  public render(): JSX.Element {
    const { pendingTxs, txs, lastTx, logoutProfile } = this.props;

    return (
      <MatchMediaContext.Consumer>
        {phone => (
          <Layout
            phoneMode={phone}
            pendingTxs={pendingTxs}
            txs={txs}
            lastTx={lastTx}
            logoutProfile={logoutProfile}
          />
        )}
      </MatchMediaContext.Consumer>
    );
  }
}

export default connect(
  selector,
  actions,
)(Header);
