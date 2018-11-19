import React from "react";
import styled from "styled-components";

import { TokenTicker } from "@iov/core";

import DropTriangleIcon from "../../../../resources/down_triangle.svg";

import { Dropdown } from "./dropdown";

interface TokenInputProps {
  readonly amount: string;
  readonly isValidAmount: boolean;
  readonly hasEnoughToken: boolean;
  readonly tokens: ReadonlyArray<TokenTicker>;
  readonly onChangeAmount: (amount: string) => any;
  readonly onChangeToken: (token: TokenTicker) => any;
}

interface TokenInputState {
  readonly amount: string;
  readonly selectedToken: TokenTicker;
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TokenDropdownTrigger = styled.div`
  padding: 4px 12px;
  padding-right: 22px;
  border-radius: 5px;
  background-color: #f7f7f7;
  background-image: url(${DropTriangleIcon});
  background-repeat: no-repeat;
  background-position: center right 7px;
  background-size: 9px 5px;
  font-family: Muli;
  font-size: 16px;
  font-weight: 300;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #1c1c1c;
`;

const InputWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  align-items: center;
`;

const Input = styled.input`
  width: 50%;
  border: none;
  outline: none;
  background: transparent;
  font-family: Muli;
  font-size: 40px;
  font-weight: 300;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #1c1c1c;
  margin-right: 10px;
  text-align: right;
`;

const ErrorMessage = styled.div`
  text-align: center;
  font-family: Muli;
  font-size: 14px;
  font-weight: bold;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: 0.7px;
  color: #ffb968;
`;

export class TokenInput extends React.Component<TokenInputProps, TokenInputState> {
  public readonly state = {
    amount: "",
    selectedToken: "" as TokenTicker,
  };
  constructor(props: TokenInputProps) {
    super(props);
    this.state = {
      amount: props.amount,
      selectedToken: props.tokens[0],
    };
  }
  public readonly onChangeToken = (token: string): void => {
    this.setState({
      selectedToken: token as TokenTicker,
    });
    this.props.onChangeToken(token as TokenTicker);
  };
  public readonly onChangeAmount = (evt: React.SyntheticEvent<EventTarget>): void => {
    const target = evt.target as HTMLInputElement;
    const amount = target.value;
    this.setState({
      amount,
    });
    this.props.onChangeAmount(amount);
  };
  public render(): JSX.Element {
    const { amount, selectedToken } = this.state;
    const { tokens, isValidAmount, hasEnoughToken } = this.props;
    const selectables = tokens.map(token => ({
      value: token as string,
      label: token as string,
      description: token as string,
    }));
    return (
      <Wrapper>
        <InputWrapper>
          <Input type="text" value={amount} onChange={this.onChangeAmount} placeholder="0,00" />
          <Dropdown items={selectables} defaultValue={selectedToken} onSelect={this.onChangeToken}>
            <TokenDropdownTrigger>{selectedToken}</TokenDropdownTrigger>
          </Dropdown>
        </InputWrapper>
        {!isValidAmount ? (
          <ErrorMessage>Invalid Amount</ErrorMessage>
        ) : !hasEnoughToken ? (
          <ErrorMessage>Not Enough Token</ErrorMessage>
        ) : (
          false
        )}
      </Wrapper>
    );
  }
}
