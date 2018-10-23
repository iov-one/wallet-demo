// tslint:disable:no-empty
// TODO: remove above comment when the empty onClick is gone
import { get } from "lodash";
import * as React from "react";
import { connect } from "react-redux";
import { withRouter, RouteComponentProps } from "react-router";

import { PageStructure } from "../components/compoundComponents/page";
import { SendTokenForm, SendTokenFormState } from "../components/templates/forms";

import { ChainAccount, getMyAccounts } from "../selectors";

interface SendTokenProps extends RouteComponentProps<{}> {
  readonly accounts: ReadonlyArray<ChainAccount>;
}

class SendToken extends React.Component<SendTokenProps, any> {
  public onSend = (transInfo: SendTokenFormState): any => {
    console.log(transInfo);
  };
  public render(): JSX.Element | boolean {
    const { accounts } = this.props;
    const account = get(accounts, "[0].account", false);
    if (!account) {
      return false;
    }
    const name = `${account.name}*iov.value`;
    const balance = account.balance;
    return (
      <PageStructure whiteBg>
        <SendTokenForm name={name} balance={balance[0]} onSend={this.onSend} />
      </PageStructure>
    );
  }
}

const mapStateToProps = (state: any, ownProps: SendTokenProps): SendTokenProps => ({
  ...ownProps,
  accounts: getMyAccounts(state),
});

export const SendTokenPage = withRouter(connect(mapStateToProps)(SendToken));
