import { BcpCoin } from "@iov/bcp-types";
import * as React from "react";
import { connect } from "react-redux";
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
    const {
      tickers,
      defaultBalance: { tokenTicker: defaultTokenTicker },
    } = this.props;
    const { balanceToSend } = this.state;

    return (
      <Layout
        balance={balanceToSend}
        tickersWithBalance={tickers}
        defaultTicket={defaultTokenTicker}
        onUpdateBalanceToSend={this.onUpdateBalanceToSend}
        onSubmit={this.onSendPayment}
        validation={this.onSendPaymentValidation}
      />
    );
  }
}

export default connect(selector)(SendPayment);
