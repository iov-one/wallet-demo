import * as React from "react";
import { connect } from "react-redux";
import { MatchMediaContext } from "~/context/MatchMediaContext";
import Layout from "./components";
import selector, { SelectorProps } from "./selector";

class Header extends React.Component<SelectorProps> {
  private readonly phoneHookRef = React.createRef<HTMLDivElement>();

  public render(): JSX.Element {
    const { pendingTxs, txs } = this.props;

    return (
      <MatchMediaContext.Consumer>
        {phone => (
          <React.Fragment>
            <Layout
              phoneHook={this.phoneHookRef.current}
              phoneMode={phone}
              pendingTxs={pendingTxs}
              txs={txs}
            />
            <div ref={this.phoneHookRef} />
          </React.Fragment>
        )}
      </MatchMediaContext.Consumer>
    );
  }
}

export default connect(selector)(Header);
