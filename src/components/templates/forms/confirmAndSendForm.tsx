import React from "react";
import styled from "styled-components";

import { isEmpty } from "lodash";

import { InputField } from "../../compoundComponents/form";
import { PrimaryButton, RevertButton } from "../../subComponents/buttons";
import { ErrorNotification } from "../../subComponents/error";
import { H1 } from "../../subComponents/typography";
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

export interface TransactionInfo {
  readonly iovAddress: string;
  readonly tokenAmount: string;
  readonly memo: string;
}

interface ConfirmFormProps {
  readonly iovAddress: string;
  readonly tokenAmount: string;
  readonly memo: string;
  readonly error?: string;
  readonly loading: boolean;
  readonly onSend: (transactionInfo: TransactionInfo) => any;
  readonly onBack: () => any;
}

export class ConfirmTransactionForm extends React.Component<ConfirmFormProps> {
  public render(): JSX.Element | boolean {
    const { iovAddress, tokenAmount, memo, error, loading, onSend, onBack } = this.props;
    return (
      <FormWrapper>
        <ErrorNotification type="transaction" show={!isEmpty(error)} />
        <Container>
          <Wrapper>
            {/* <H2>{error ? error.slice(0, 300) : ""}</H2> */}
            <H1 style={{ textAlign: "center" }}>Confirm & Send</H1>
            <Content>
              <InputField title="To:" value={iovAddress} disabled readonly />
              <InputField title="Amount:" unit="IOV" value={tokenAmount} disabled readonly />
              <InputField title="Memo:" value={memo} disabled readonly />
            </Content>
          </Wrapper>
          <ActionWrapper>
            <RevertButton title="Back" onClick={onBack} />
            <PrimaryButton
              title="Confirm"
              loading={loading}
              onClick={() => onSend({ iovAddress, tokenAmount, memo })}
            />
          </ActionWrapper>
        </Container>
      </FormWrapper>
    );
  }
}
