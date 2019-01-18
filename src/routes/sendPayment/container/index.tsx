import { BcpCoin } from "@iov/bcp-types";
import * as React from "react";
import { connect } from "react-redux";
import { FormType } from "~/components/forms/Form";
import { BlockchainSpec, specToConnector } from "~/logic";
import { CONFIRM_TRANSACTION } from "~/routes";
import Layout from "~/routes/sendPayment/components";
import { history } from "~/store";
import { loadConfig } from "~/utils/conf";
import { RECIPIENT_FIELD, TOKEN_FIELD } from "../components/SendCard";
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

  public readonly onSendPaymentValidation = async (values: object): Promise<object> => {
    const { chainTickers } = this.props;
    const formValues = values as FormType;

    const ticker = formValues[TOKEN_FIELD];
    const selectedTicker = chainTickers.find(chainTicker => chainTicker.ticker.tokenTicker === ticker);
    if (!selectedTicker) {
      return {
        [RECIPIENT_FIELD]: `Not found ${ticker} in list`,
      };
    }

    const config = await loadConfig();
    const chains = config.chains.map(cfg => cfg.chainSpec as BlockchainSpec);
    const selectedChainId = chains.find(chain => chain.chainId === selectedTicker.chainId);
    if (!selectedChainId) {
      return {
        [RECIPIENT_FIELD]: `Not found valid chain for ${ticker}`,
      };
    }

    try {
      const connector = specToConnector(selectedChainId);
      const maybeAddress = formValues[RECIPIENT_FIELD];
      if (!connector.codec.isValidAddress(maybeAddress)) {
        return {
          [RECIPIENT_FIELD]: `Invalid address for chain ${selectedChainId.chainId}: ${maybeAddress}`,
        };
      }
    } catch (err) {
      return {
        [RECIPIENT_FIELD]: `Error validating address`,
      };
    }

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
