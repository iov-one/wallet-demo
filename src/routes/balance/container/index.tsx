import * as React from "react";
import { connect } from "react-redux";
import PageMenu from "~/components/pages/PageMenu";
import { PAYMENT_ROUTE, RECEIVE_FROM_IOV_USER } from "~/routes";
import Layout from "~/routes/balance/components";
import { history } from "~/store";
import selector, { SelectorProps } from "./selector";

export const IOV_NAMESPACE = "*iov";

class Balance extends React.Component<SelectorProps> {
  public readonly onSendPayment = () => {
    history.push(PAYMENT_ROUTE);
  };

  public readonly onReceivePayment = () => {
    history.push(RECEIVE_FROM_IOV_USER);
  };

  public render(): JSX.Element {
    const { name, tokens } = this.props;
    const iovAddress = `${name}${IOV_NAMESPACE}`;

    const renderProps = (phone: boolean) => (
      <Layout
        onSendPayment={this.onSendPayment}
        onReceivePayment={this.onReceivePayment}
        name={iovAddress}
        tokens={tokens}
        phone={phone}
      />
    );

    return <PageMenu phoneFullWidth renderProps={renderProps} />;
  }
}

export default connect(selector)(Balance);
