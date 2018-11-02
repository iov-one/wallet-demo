import { FungibleToken } from "@iov/bcp-types";
import React from "react";
import styled from "styled-components";

import { isEmpty } from "lodash";

import { InputField } from "../../compoundComponents/form";
import { PrimaryButton, RevertButton } from "../../subComponents/buttons";
import { ErrorNotification } from "../../subComponents/error";
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
  readonly error?: string;
  readonly loading: boolean;
  readonly onSend: (transactionInfo: SendTokenFormState) => any;
  readonly onBack: () => any;
}

export class SendTokenForm extends React.Component<SendTokenFormProps, SendTokenFormState> {
  public readonly state = {
    iovAddress: "",
    isValidAddress: false,
    tokenAmount: "",
    isValidAmount: false,
    memo: "",
  };
  public readonly onChangeAddress = (evt: any) => {
    const address = evt.target.value;
    this.setState({
      iovAddress: address,
      isValidAddress: address.length > 0,
    });
  };
  public readonly onChangeAmount = (evt: any) => {
    const regex = /^[0-9]*([\.\,][0-9]+)?$/;
    const amount = evt.target.value;
    const isValid = amount.length > 0 && regex.exec(amount) !== null;
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
    const { name, balance, error, loading, onSend, onBack } = this.props;
    const { iovAddress, tokenAmount, memo, isValidAddress, isValidAmount } = this.state;
    return (
      <FormWrapper>
        <ErrorNotification type="transaction" show={!isEmpty(error)} />
        <Container>
          <Wrapper>
            {/* <H2>{error ? error.slice(0, 300) : ""}</H2> */}
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
            <RevertButton title="Cancel" onClick={onBack} />
            <PrimaryButton
              title="Continue"
              disabled={!isValidAddress || !isValidAmount}
              loading={loading}
              onClick={() => onSend(this.state)}
            />
          </ActionWrapper>
        </Container>
      </FormWrapper>
    );
  }
}
