import * as React from "react";
import { connect } from "react-redux";
import PageMenu from "~/components/pages/PageMenu";
import { PAYMENT_ROUTE, RECEIVE_FROM_IOV_USER } from "~/routes";
import Layout from "~/routes/balance/components";
import { history } from "~/store";
import selector, { SelectorProps } from "./selector";

class Balance extends React.Component<SelectorProps> {
  public render(): JSX.Element {
    const { name, tokens } = this.props;

    const onSendPayment = () => {
      history.push(PAYMENT_ROUTE);
    };

    const onReceivePayment = () => {
      history.push(RECEIVE_FROM_IOV_USER);
    };

    const renderProps = (phone: boolean) => (
      <Layout
        onSendPayment={onSendPayment}
        onReceivePayment={onReceivePayment}
        name={name}
        tokens={tokens}
        phone={phone}
      />
    );

    return <PageMenu phoneFullWidth renderProps={renderProps} />;
  }
}

export default connect(selector)(Balance);
