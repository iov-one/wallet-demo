import * as React from "react";
import { connect } from "react-redux";
import { Errors } from "~/components/forms/Form";
import PageMenuColumn from "~/components/pages/PageMenuColumn";
import { CONFIRM_TRANSACTION } from "~/routes";
import Layout from "~/routes/sendPayment/components";
import { history } from "~/store";
import selector, { SelectorProps } from "./selector";

type Props = SelectorProps;

class SendPayment extends React.Component<Props> {
  public readonly onSendPayment = async (values: object): Promise<void> => {
    console.log(values);
    history.push(CONFIRM_TRANSACTION);
  };

  public readonly onSendPaymentValidation = (values: object): object => {
    console.log(values);
    const errors: Errors = {};

    return errors;
  };

  public render(): JSX.Element {
    const { balanceTokens, tickers, defaultToken } = this.props;
    return (
      <PageMenuColumn phoneFullWidth>
        <Layout
          balances={balanceTokens}
          balanceTickers={tickers}
          defaultTicker={defaultToken}
          onSubmit={this.onSendPayment}
          validation={this.onSendPaymentValidation}
        />
      </PageMenuColumn>
    );
  }
}

export default connect(selector)(SendPayment);
