import React from "react";
import styled from "styled-components";

import { find, isEmpty } from "lodash";

import { Amount, BcpCoin, TokenTicker } from "@iov/bcp-types";

import { TokenInput } from "../../compoundComponents/form";
import { VerticalButtonGroup } from "../../compoundComponents/sections";
import { SecondaryInput } from "../../subComponents/input";
import { Paper } from "../../subComponents/page";
import { H2, TextFieldLabel } from "../../subComponents/typography";

import { compareAmounts, prettyAmount, stringToAmount } from "~/logic";

const NameWrapper = styled.div`
  position: absolute;
  box-sizing: border-box;
  width: 70px;
  height: 70px;
  padding: 20px 0px;
  border-radius: 35px;
  background-color: #ffe152;
  text-align: center;
  font-family: Muli;
  font-size: 24px;
  font-weight: bold;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  color: #fff;
  text-transform: uppercase;
  left: calc(50% - 35px);
  top: 120px;
  z-index: 1;
`;

const SendingAddress = styled(H2)`
  text-align: center;
  margin-top: 11px;
`;

const Splitter = styled.div`
  height: 1px;
  width: 100%;
  background-color: #f3f3f3;
  margin-top: 40px;
  margin-bottom: 30px;
`;

const TokenText = styled.div`
  font-family: Muli;
  font-size: 14px;
  font-weight: 600;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #a2a6a8;
  margin: 30px 0px;
  text-align: center;
`;

const Wrapper = styled.div`
  margin-top: 85px;
  flex-basis: 450px;
`;

const SendingLabel = styled(TextFieldLabel)`
  margin-bottom: 30px;
  text-align: center;
  line-height: 18px;
`;

export interface SendTokenFormState {
  readonly tokenAmount: string;
  readonly token: TokenTicker;
  readonly isValidAmount: boolean;
  readonly hasEnoughToken: boolean;
  readonly memo: string;
}

interface SendTokenFormProps {
  readonly name: string;
  readonly iovAddress: string;
  readonly defaultToken: TokenTicker;
  readonly balances: ReadonlyArray<Amount>;
  readonly onSend: (transactionInfo: SendTokenFormState) => any;
  readonly onBack: () => any;
}

export class SendTokenForm extends React.Component<SendTokenFormProps, SendTokenFormState> {
  public readonly state = {
    tokenAmount: "0",
    isValidAmount: false,
    memo: "",
    hasEnoughToken: false,
    token: "" as TokenTicker,
  };
  constructor(props: SendTokenFormProps) {
    super(props);
    this.state = {
      tokenAmount: "",
      isValidAmount: true,
      hasEnoughToken: true,
      memo: "",
      token: props.defaultToken,
    };
  }
  public readonly getSelectedToken = (token: TokenTicker): BcpCoin => {
    const { balances } = this.props;
    const balance = find(balances, item => item.tokenTicker === token);
    return balance
      ? ({
          ...balance,
          sigFigs: 9,
          tokenName: balance.tokenTicker,
        } as BcpCoin)
      : ({
          quantity: "0",
          fractionalDigits: 0,
          tokenTicker: token,
          tokenName: token,
        } as BcpCoin);
  };
  public readonly hasEnoughBalance = (balance: Amount, amount: string): boolean => {
    try {
      const amountInToken = stringToAmount(amount, balance.tokenTicker);
      this.setState({
        isValidAmount: true,
      });
      // amount must be less than current balance
      return compareAmounts(amountInToken, balance) <= 0;
    } catch {
      this.setState({
        isValidAmount: false,
      });
      return false;
    }
  };
  public readonly onChangeAmount = (tokenAmount: string): void => {
    const { token } = this.state;
    const balance = this.getSelectedToken(token);
    const hasEnoughToken = this.hasEnoughBalance(balance, tokenAmount);
    this.setState({
      tokenAmount,
      hasEnoughToken,
    });
  };
  public readonly onChangeToken = (token: TokenTicker): void => {
    this.setState({
      token,
    });
  };
  public readonly onChangeMemo = (evt: React.SyntheticEvent<EventTarget>): void => {
    const target = evt.target as HTMLInputElement;
    this.setState({
      memo: target.value,
    });
  };
  public readonly onSend = () => {
    if (isEmpty(this.state.tokenAmount)) {
      this.setState({
        isValidAmount: false,
      });
      return;
    }
    this.props.onSend({
      ...this.state,
    });
  };
  public render(): JSX.Element | boolean {
    const { balances, name, iovAddress } = this.props;
    const { tokenAmount, token, isValidAmount, hasEnoughToken } = this.state;
    const tokens = balances.map(balance => balance.tokenTicker);
    const selectedBalance = this.getSelectedToken(token);
    const buttons: ReadonlyArray<any> = [
      {
        title: "Continue",
        type: "primary",
        onClick: this.onSend,
        disabled: !isValidAmount || !hasEnoughToken,
      },
      {
        title: "Cancel",
        type: "revert",
        onClick: this.props.onBack,
      },
    ];
    return (
      <Wrapper>
        <NameWrapper>{name.slice(0, 2)}</NameWrapper>
        <Paper>
          <SendingAddress>{iovAddress}</SendingAddress>
          <Splitter />
          <SendingLabel>You send</SendingLabel>
          <TokenInput
            amount={tokenAmount}
            isValidAmount={isValidAmount}
            hasEnoughToken={hasEnoughToken}
            tokens={tokens}
            onChangeAmount={this.onChangeAmount}
            onChangeToken={this.onChangeToken}
          />
          <TokenText>balance: {prettyAmount(selectedBalance)}</TokenText>
          <SecondaryInput placeholder="add a note" onChange={this.onChangeMemo} />
        </Paper>
        <VerticalButtonGroup buttons={buttons} />
      </Wrapper>
    );
  }
}
