import { BcpCoin } from "@iov/bcp-types";
import * as React from "react";
import { connect } from "react-redux";
import { FormType } from "~/components/forms/Form";
import ConfirmPayment from "~/routes/sendPayment/components/ConfirmPayment";
import { Payment } from "~/routes/sendPayment/components/ConfirmPayment/ConfirmCard";
import FillPayment from "~/routes/sendPayment/components/FillPayment";
import {
  AMOUNT_FIELD,
  NOTE_FIELD,
  RECIPIENT_FIELD,
  TOKEN_FIELD,
} from "~/routes/sendPayment/components/FillPayment/SendCard";
import selector, { SelectorProps } from "./selector";

type Props = SelectorProps;

interface State {
  readonly balanceToSend: BcpCoin;
  readonly page: number;
  readonly payment: Payment | undefined;
}

const FILL_PAYMENT = 0;
const CONFIRM_PAYMENT = 1;

class SendPayment extends React.Component<Props, State> {
  public readonly state = {
    balanceToSend: this.props.defaultBalance,
    page: FILL_PAYMENT,
    payment: undefined,
  };

  public readonly onSendPayment = async (values: object): Promise<void> => {
    const { defaultBalance } = this.props;
    const formValues = values as FormType;

    const ticker = formValues[TOKEN_FIELD] || defaultBalance.tokenTicker;
    const recipient = formValues[RECIPIENT_FIELD];
    const amount = formValues[AMOUNT_FIELD];
    const note = formValues[NOTE_FIELD];

    this.setState(() => ({
      page: CONFIRM_PAYMENT,
      payment: {
        ticker,
        amount,
        note,
        recipient,
      },
    }));
  };

  public readonly onSendPaymentValidation = async (_: object): Promise<object> => {
    /*
    TODO Waiting iov-core 0.11

    const { chainTickers, signer, connection, defaultBalance } = this.props;
    const formValues = values as FormType;
    const ticker = formValues[TOKEN_FIELD] || defaultBalance.tokenTicker;
    const maybeAddress = formValues[RECIPIENT_FIELD];
    
    if (!isIovAddress(maybeAddress)) {
      const selectedTicker = chainTickers.find(chainTicker => chainTicker.ticker.tokenTicker === ticker);
      const chainId = selectedTicker!.chainId
      const valid = signer.isValidAddress(chainId, maybeAddress)
  
      return valid ? {} : generateError(RECIPIENT_FIELD, `Invalid address for chain ${chainId}: ${maybeAddress}`)
    }

    // check if name is registered in BNS
    const exists = (await getUsernameNftByUsername(connection, maybeAddress)) !== undefined;
    if (!exists) {
      return generateError(RECIPIENT_FIELD, 'IOV address not registered');
    }
    */
    return {};
  };

  public readonly onUpdateBalanceToSend = (ticker: string) => {
    const balanceToken = this.props.balanceTokens.find(balance => balance.tokenTicker === ticker);
    this.setState(() => ({ balanceToSend: balanceToken! }));
  };

  public render(): JSX.Element {
    const { page } = this.state;

    if (page === FILL_PAYMENT) {
      return (
        <FillPayment
          balance={this.state.balanceToSend}
          tickersWithBalance={this.props.tickers}
          defaultTicket={this.props.defaultBalance.tokenTicker}
          onUpdateBalanceToSend={this.onUpdateBalanceToSend}
          onSubmit={this.onSendPayment}
          validation={this.onSendPaymentValidation}
        />
      );
    }

    return <ConfirmPayment payment={this.state.payment!} />;
  }
}

export default connect(selector)(SendPayment);
