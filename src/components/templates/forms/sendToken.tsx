import React from "react";
import styled from "styled-components";

import { find } from "lodash";

import { BcpCoin, FungibleToken, TokenTicker } from "@iov/bcp-types";

import { TokenInput } from "../../compoundComponents/form";
import { VerticalButtonGroup } from "../../compoundComponents/sections";
import { SecondaryInput } from "../../subComponents/input";
import { Paper } from "../../subComponents/page";
import { H2, TextFieldLabel } from "../../subComponents/typography";

import { coinToString, stringToCoin } from "../../../logic/balances";

const NameWrapper = styled.div`
  position: absolute;
  box-sizing: border-box;
  width: 70px;
  height: 70px;
  padding: 14px 0px;
  border-radius: 35px;
  background-color: #ffe152;
  text-align: center;
  font-family: Muli;
  font-size: 32px;
  font-weight: bold;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  color: #fff;
  text-transform: capitalize;
  left: 190px;
  top: -35px;
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
  margin-top: 50px;
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
  readonly balances: ReadonlyArray<FungibleToken>;
  readonly onSend: (transactionInfo: SendTokenFormState) => any;
  readonly onBack: () => any;
}

const convertStringToFungibleToken = (
  tokenAmount: string,
  sigFigs: number,
  tokenTicker: TokenTicker,
): FungibleToken => {
  const { whole, fractional } = stringToCoin(tokenAmount, sigFigs);
  return { whole, fractional, tokenTicker };
};

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
    const token = props.balances[0].tokenTicker;
    this.state = {
      tokenAmount: "0",
      isValidAmount: true,
      hasEnoughToken: true,
      memo: "",
      token,
    };
  }
  public readonly getSelectedToken = (token: TokenTicker): BcpCoin => {
    const { balances } = this.props;
    const balance = find(balances, balance => balance.tokenTicker === token) || balances[0];
    return {
      ...balance,
      sigFigs: 9,
      tokenName: balance.tokenTicker,
    } as BcpCoin;
  };
  public readonly hasEnoughBalance = (balance: FungibleToken, amount: string): boolean => {
    try {
      const amountInToken = convertStringToFungibleToken(amount, 9, balance.tokenTicker);
      if (amountInToken.whole < balance.whole) {
        return true;
      }
      if (amountInToken.whole === balance.whole && amountInToken.fractional <= balance.fractional) {
        return true;
      }
      return false;
    } catch {
      this.setState({
        isValidAmount: false,
      });
      return false;
    }
  };
  public readonly onChangeAmount = (tokenAmount: string): any => {
    const { token } = this.state;
    const balance = this.getSelectedToken(token);
    const hasEnoughToken = this.hasEnoughBalance(balance, tokenAmount);
    this.setState({
      tokenAmount,
      hasEnoughToken,
    });
  };
  public readonly onChangeToken = (token: TokenTicker): any => {
    this.setState({
      token,
    });
  };
  public readonly onChangeMemo = (evt: React.SyntheticEvent<EventTarget>) => {
    const target = evt.target as HTMLInputElement;
    this.setState({
      memo: target.value,
    });
  };
  public readonly onSend = () => {
    this.props.onSend({
      ...this.state,
    });
  };
  public render(): JSX.Element | boolean {
    const { balances, name, iovAddress } = this.props;
    const { token, isValidAmount, hasEnoughToken } = this.state;
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
        <Paper style={{ marginBottom: "30px" }}>
          <NameWrapper>{name.slice(0, 1)}</NameWrapper>
          <H2 className="center">{iovAddress}</H2>
          <Splitter />
          <TextFieldLabel style={{ marginBottom: "30px" }}>You send</TextFieldLabel>
          <TokenInput
            amount="0"
            isValidAmount={isValidAmount}
            hasEnoughToken={hasEnoughToken}
            tokens={tokens}
            onChangeAmount={this.onChangeAmount}
            onChangeToken={this.onChangeToken}
          />
          <TokenText>
            {coinToString(selectedBalance)} {selectedBalance.tokenTicker}
          </TokenText>
          <SecondaryInput placeholder="add a note" onChange={this.onChangeMemo} />
        </Paper>
        <VerticalButtonGroup buttons={buttons} />
      </Wrapper>
    );
  }
}
