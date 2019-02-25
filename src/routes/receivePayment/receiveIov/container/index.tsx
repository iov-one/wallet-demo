import * as React from "react";
import { connect } from "react-redux";
import PageMenu from "~/components/pages/PageMenu";
import { SuggestionButton } from "~/components/subComponents/buttons";
import { IOV_NAMESPACE } from "~/logic";
import { RECEIVE_FROM_NON_IOV_USER } from "~/routes";
import Layout from "~/routes/receivePayment/receiveIov/components";
import { history } from "~/store";
import selector, { SelectorProps } from "./selector";

class RecieveIov extends React.Component<SelectorProps> {
  public readonly onReceiveExternal = () => {
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
          onClick={this.onReceiveExternal}
        />
      </PageMenu>
    );
  }
}

export default connect(selector)(RecieveIov);
