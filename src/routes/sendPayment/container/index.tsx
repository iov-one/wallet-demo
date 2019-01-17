import { BcpCoin } from "@iov/bcp-types";
import * as React from "react";
import { connect } from "react-redux";
import { Errors } from "~/components/forms/Form";
import PageMenuColumn from "~/components/pages/PageMenuColumn";
import { CONFIRM_TRANSACTION } from "~/routes";
import Layout from "~/routes/sendPayment/components";
import { history } from "~/store";
import selector, { SelectorProps } from "./selector";

type Props = SelectorProps;

interface State {
  readonly balanceToSend: BcpCoin;
}

class SendPayment extends React.Component<Props, State> {
  public readonly state = {
    balanceToSend: this.props.defaultBalance,
  };

  public readonly onSendPayment = async (values: object): Promise<void> => {
    console.log(values);
    history.push(CONFIRM_TRANSACTION);
  };

  public readonly onSendPaymentValidation = (values: object): object => {
    console.log(values);
    const errors: Errors = {};

    return errors;
  };

  public readonly onUpdateBalanceToSend = (ticker: string) => {
    const balanceToken = this.props.balanceTokens.find(balance => balance.tokenTicker === ticker);
    this.setState(() => ({ balanceToSend: balanceToken! }));
  };

  public render(): JSX.Element {
    const {
      tickers,
      defaultBalance: { tokenTicker: defaultTokenTicker },
    } = this.props;
    const { balanceToSend } = this.state;

    return (
      <PageMenuColumn phoneFullWidth>
        <Layout
          balance={balanceToSend}
          tickersWithBalance={tickers}
          defaultTicket={defaultTokenTicker}
          onUpdateBalanceToSend={this.onUpdateBalanceToSend}
          onSubmit={this.onSendPayment}
          validation={this.onSendPaymentValidation}
        />
      </PageMenuColumn>
    );
  }
}

export default connect(selector)(SendPayment);
