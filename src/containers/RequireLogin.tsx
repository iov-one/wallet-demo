import * as React from "react";
import { Redirect } from "react-router-dom";

import { ChainAccount } from "../selectors";

interface RequireLoginProps {
  readonly accounts: ReadonlyArray<ChainAccount>;
  readonly children?: React.ReactNode | ReadonlyArray<React.ReactNode>;
}

export class RequireLogin extends React.Component<RequireLoginProps, any> {
  public render(): JSX.Element {
    const { accounts, children } = this.props;
    // redirect is the url to redirect to, or undefined if no redirect
    const redirect =
      accounts.length === 0 || accounts[0].account === undefined
        ? "/" /*login/signup page*/
        : accounts[0].account.name === undefined
        ? "/" /*set name page*/
        : undefined;

    // normalize to an array so we can run map
    const components = Array.isArray(children) ? children : [children];
    const filtered = components.map(comp => (redirect ? <Redirect to={redirect} /> : comp));

    return (
      <div>
        {filtered.map((comp, i) => (
          <div key={i}>{comp}</div>
        ))}
      </div>
    );
  }
}
