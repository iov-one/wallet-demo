import * as React from "react";
import { connect } from "react-redux";
import PageMenu from "~/components/pages/PageMenu";
import { SuggestionButton } from "~/components/subComponents/buttons";
import { IOV_NAMESPACE } from "~/logic";
import { RECEIVE_FROM_NON_IOV_USER } from "~/routes";
import { history } from "~/store";
import selector, { SelectorProps } from "./selector";

import Layout from "../components/ReceiveIOVForm";

class RecieveIov extends React.Component<SelectorProps> {
  public readonly onReceiveExpernal = () => {
    history.push(RECEIVE_FROM_NON_IOV_USER);
  };

  public render(): JSX.Element {
    const { accountName } = this.props;
    const iovAddress = accountName ? `${accountName}${IOV_NAMESPACE}` : "--";

    return (
      <PageMenu phoneFullWidth>
        <Layout iovAddress={iovAddress} />
        <SuggestionButton
          suggestionText="Receiving from outside IOV?"
          buttonText="View your address"
          onClick={this.onReceiveExpernal}
        />
      </PageMenu>
    );
  }
}

export default connect(selector)(RecieveIov);
