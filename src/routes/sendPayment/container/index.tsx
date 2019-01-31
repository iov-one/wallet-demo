import { Amount, BcpCoin } from "@iov/bcp-types";
import * as React from "react";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router";
import uniquId from "uniqid";
import { FormType, generateError } from "~/components/forms/Form";
import { Item } from "~/components/forms/SelectField";
import { getUsernameNftByUsername, IOV_NAMESPACE, isIovAddress, padAmount, stringToAmount } from "~/logic";
import { BALANCE_ROUTE } from "~/routes";
import ConfirmPayment from "~/routes/sendPayment/components/ConfirmPayment";
import { Payment } from "~/routes/sendPayment/components/ConfirmPayment/ConfirmCard";
import FillPayment from "~/routes/sendPayment/components/FillPayment";
import {
  AMOUNT_FIELD,
  NOTE_FIELD,
  RECIPIENT_FIELD,
  TOKEN_FIELD,
} from "~/routes/sendPayment/components/FillPayment/SendCard";
import { history } from "~/store";
import actions, { SendPaymentActions } from "./actions";
import selector, { SelectorProps } from "./selector";

interface RouteLocation {
  readonly [RECIPIENT_FIELD]: string | undefined;
}

interface Props extends RouteComponentProps<RouteLocation>, SelectorProps, SendPaymentActions {}

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
    const { defaultBalance, chainTickers } = this.props;
    const formValues = values as FormType;

    const ticker = formValues[TOKEN_FIELD] || defaultBalance.tokenTicker;
    const recipient = formValues[RECIPIENT_FIELD];
    const amount = formValues[AMOUNT_FIELD];
    const note = formValues[NOTE_FIELD];

    const selectedTicker = chainTickers.find(chainTicker => chainTicker.ticker.tokenTicker === ticker);
    const chainId = selectedTicker!.chainId;

    this.setState(() => ({
      page: CONFIRM_PAYMENT,
      payment: {
        ticker,
        amount,
        note,
        recipient,
        chainId,
      },
    }));
  };

  public readonly onSendPaymentValidation = async (values: object): Promise<object> => {
    const { connection, chainTickers, defaultBalance, signer } = this.props;
    const formValues = values as FormType;
    const maybeAddress = formValues[RECIPIENT_FIELD];

    // Fix infinity loop when changing page
    if (!maybeAddress) {
      return {};
    }

    if (!isIovAddress(maybeAddress)) {
      const ticker = formValues[TOKEN_FIELD] || defaultBalance.tokenTicker;
      const chainId = chainTickers.find(chainTicker => chainTicker.ticker.tokenTicker === ticker)!.chainId;
      const valid = signer.isValidAddress(chainId, maybeAddress);
      return valid
        ? {}
        : generateError(RECIPIENT_FIELD, `Invalid address for chain ${chainId}: ${maybeAddress}`);
    }

    // check if name is registered in BNS (remember to remove namespace component)
    const username = maybeAddress.slice(0, -IOV_NAMESPACE.length);
    const nft = await getUsernameNftByUsername(connection, username);
    if (nft === undefined) {
      return generateError(RECIPIENT_FIELD, "IOV address not registered");
    }

    return {};
  };

  /**
   * This method is called each time user changes ticker in the dropdown.
   */
  public readonly onUpdateBalanceToSend = (ticker: Item) => {
    const balanceToken = this.props.balanceTokens.find(balance => balance.tokenTicker === ticker.name);
    this.setState(() => ({ balanceToSend: balanceToken! }));
  };

  public readonly onConfirmPayment = async () => {
    const { balanceToSend, payment } = this.state;
    const { sendTransaction, accountName } = this.props;

    if (!payment) {
      throw new Error("Unable to process TX, info lost");
    }

    const { chainId, ticker, amount, note, recipient } = payment;
    const txAmount: Amount = stringToAmount(amount, ticker);
    // use amount of sigfigs from the ticker. 9 is needed for bns, 8 for lisk, 18 for eth...
    const paddedTxAmount = padAmount(txAmount, balanceToSend.fractionalDigits);
    const id = uniquId();
    if (!accountName) {
      throw new Error("Not possible to send a transaction without an account");
    }
    // we start the sequence, but do not
    sendTransaction(chainId, recipient, paddedTxAmount, note, id, accountName);

    history.push(BALANCE_ROUTE);
  };

  public render(): JSX.Element {
    const { page } = this.state;

    if (page === FILL_PAYMENT) {
      const { state: routeState } = this.props.location;
      const initialValues = {
        [RECIPIENT_FIELD]: routeState ? routeState[RECIPIENT_FIELD] : undefined,
      };

      return (
        <FillPayment
          initialValues={initialValues}
          balance={this.state.balanceToSend}
          tickersWithBalance={this.props.tickers}
          defaultTicker={this.props.defaultBalance.tokenTicker}
          onUpdateBalanceToSend={this.onUpdateBalanceToSend}
          onSubmit={this.onSendPayment}
          validation={this.onSendPaymentValidation}
        />
      );
    }

    return <ConfirmPayment onContinue={this.onConfirmPayment} payment={this.state.payment!} />;
  }
}

export default connect(
  selector,
  actions,
)(SendPayment);
