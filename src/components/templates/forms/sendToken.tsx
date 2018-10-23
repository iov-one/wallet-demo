import { FungibleToken } from "@iov/bcp-types";
import React from "react";
import styled from "styled-components";

import { InputField } from "../../compoundComponents/form";
import { PrimaryButton } from "../../subComponents/buttons";
import { AccountBalance, AccountName } from "../../subComponents/typography";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 510px;
  align-items: center;
`;

const Wrapper = styled.div`
  width: 510px;
  box-sizing: border-box;
  min-height: 450px;
  border-radius: 2px;
  box-shadow: 0 0 6px 0 #f3f4f8;
  background-color: #ffffff;
  padding: 30px;
`;

const Content = styled.div`
  margin-top: 30px;
  width: 100%;
`;

const ActionWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
  margin-top: 50px;
`;

export interface SendTokenFormState {
  readonly iovAddress: string;
  readonly tokenAmount: string;
  readonly memo: string;
}

interface SendTokenFormProps {
  readonly name: string;
  readonly balance: FungibleToken;
  readonly onSend: (transactionInfo: SendTokenFormState) => any;
}

export class SendTokenForm extends React.Component<SendTokenFormProps, SendTokenFormState> {
  state = {
    iovAddress: "",
    tokenAmount: "",
    memo: "",
  };
  onChangeAddress = (evt: any) => {
    this.setState({
      iovAddress: evt.target.value,
    });
  };
  onChangeAmount = (evt: any) => {
    this.setState({
      tokenAmount: evt.target.value,
    });
  };
  onChangeMemo = (evt: any) => {
    this.setState({
      memo: evt.target.value,
    });
  };
  render() {
    const { name, balance, onSend } = this.props;
    const { iovAddress, tokenAmount, memo } = this.state;
    return (
      <Container>
        <Wrapper>
          <AccountName className="noBorder">{name}</AccountName>
          <AccountBalance balance={balance} />
          <Content>
            <InputField
              title="To:"
              placeholder="IOV address"
              value={iovAddress}
              onChange={this.onChangeAddress}
            />
            <InputField
              title="Amount:"
              placeholder="1000"
              unit="IOV"
              value={tokenAmount}
              onChange={this.onChangeAmount}
            />
            <InputField
              title="Memo:"
              placeholder="Save the forest"
              value={memo}
              onChange={this.onChangeMemo}
            />
          </Content>
        </Wrapper>
        <ActionWrapper>
          <PrimaryButton
            title="Send"
            onClick={() => {
              onSend(this.state);
            }}
          />
        </ActionWrapper>
      </Container>
    );
  }
}
