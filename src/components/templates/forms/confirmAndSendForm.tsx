import React from "react";
import styled from "styled-components";

import { VerticalButtonGroup } from "../../compoundComponents/sections";
import { SecondaryInput } from "../../subComponents/input";
import { Paper } from "../../subComponents/page";
import { TransactionInfo } from "../../subComponents/typography";

const Wrapper = styled.div`
  flex-basis: 450px;
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
  readonly onSend: (transactionInfo: TransactionInfo) => any;
  readonly onBack: () => any;
}

export class ConfirmTransactionForm extends React.Component<ConfirmFormProps> {
  public render(): JSX.Element | boolean {
    const { iovAddress, token, tokenAmount, memo, onSend, onBack } = this.props;
    const buttons: ReadonlyArray<any> = [
      {
        title: "Send",
        type: "primary",
        onClick: onSend,
      },
      {
        title: "Back",
        type: "revert",
        onClick: onBack,
      },
    ];
    return (
      <Wrapper>
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
