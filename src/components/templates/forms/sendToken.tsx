import { FungibleToken } from "@iov/bcp-types";
import { isEmpty } from "lodash";
import React from "react";
import styled from "styled-components";

import { InputField } from "../../compoundComponents/form";
import { PrimaryButton } from "../../subComponents/buttons";
import { AccountBalance, AccountName } from "../../subComponents/typography";
import { FormWrapper } from "../../subComponents/wrappers";

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
  readonly isValidAddress: boolean;
  readonly tokenAmount: string;
  readonly isValidAmount: boolean;
  readonly memo: string;
}

interface SendTokenFormProps {
  readonly name: string;
  readonly balance: FungibleToken;
  readonly onSend: (transactionInfo: SendTokenFormState) => any;
}

export class SendTokenForm extends React.Component<SendTokenFormProps, SendTokenFormState> {
  public readonly state = {
    iovAddress: "",
    isValidAddress: true,
    tokenAmount: "",
    isValidAmount: true,
    memo: "",
  };
  public readonly onChangeAddress = (evt: any) => {
    const regex = /[a-z0-9]*\*iov$/gi;
    const address = evt.target.value;
    const isValid = regex.exec(address) !== null;
    this.setState({
      iovAddress: address,
      isValidAddress: isValid,
    });
  };
  public readonly onChangeAmount = (evt: any) => {
    const regex = /[0-9][0-9]*[.]*[0-9]*$/g;
    const amount = evt.target.value;
    const isValid = regex.exec(amount) !== null;
    this.setState({
      tokenAmount: amount,
      isValidAmount: isValid,
    });
  };
  public readonly onChangeMemo = (evt: any) => {
    this.setState({
      memo: evt.target.value,
    });
  };
  public render(): JSX.Element | boolean {
    const { name, balance, onSend } = this.props;
    const { iovAddress, tokenAmount, memo, isValidAddress, isValidAmount } = this.state;
    return (
      <FormWrapper>
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
                error={!isValidAddress}
                notification={isValidAddress ? "" : "Invalid Address"}
              />
              <InputField
                title="Amount:"
                placeholder="1000"
                unit="IOV"
                value={tokenAmount}
                onChange={this.onChangeAmount}
                error={!isValidAmount}
                notification={isValidAmount ? "" : "Invalid Amount"}
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
                if (isValidAddress && isValidAmount && !isEmpty(iovAddress) && !isEmpty(tokenAmount)) {
                  onSend(this.state);
                }
              }}
            />
          </ActionWrapper>
        </Container>
      </FormWrapper>
    );
  }
}
