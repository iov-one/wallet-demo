import React from "react";
import styled from "styled-components";

import { isEmpty } from "lodash";

import { VerticalButtonGroup } from "../../compoundComponents/sections";
import { Toasts } from "../../compoundComponents/toasts";
import { SecondaryInput } from "../../subComponents/input";
import { Paper } from "../../subComponents/page";
import { TransactionInfo } from "../../subComponents/typography";

const Wrapper = styled.div`
  width: 450px;
  margin-top: 50px;
`;

const Content = styled(Paper)`
  padding-top: 50px;
`;

export interface TransactionInfo {
  readonly iovAddress: string;
  readonly tokenAmount: string;
  readonly token: string;
  readonly memo: string;
}

interface ConfirmFormProps {
  readonly iovAddress: string;
  readonly tokenAmount: string;
  readonly token: string;
  readonly memo: string;
  readonly error?: string;
  readonly loading: boolean;
  readonly onSend: (transactionInfo: TransactionInfo) => any;
  readonly onBack: () => any;
}

export class ConfirmTransactionForm extends React.Component<ConfirmFormProps> {
  public render(): JSX.Element | boolean {
    const { iovAddress, token, tokenAmount, memo, error, loading, onSend, onBack } = this.props;
    const buttons: ReadonlyArray<any> = [
      {
        title: "Send",
        type: "primary",
        onClick: onSend,
        icon: loading ? "loading" : "",
      },
      {
        title: "Cancel",
        type: "revert",
        onClick: onBack,
      },
    ];
    return (
      <Wrapper>
        <Toasts type="transaction" show={!isEmpty(error)} />
        <Content>
          <TransactionInfo label="You're sending" value={`${tokenAmount} ${token}`} />
          <TransactionInfo label="To recepient" value={iovAddress} />
          <SecondaryInput placeholder="No note" value={memo} disabled />
        </Content>
        <VerticalButtonGroup buttons={buttons} />
      </Wrapper>
    );
  }
}
