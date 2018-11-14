import React from "react";
import styled from "styled-components";

import { BcpCoin } from "@iov/bcp-types";

import { TransactionButtonGroup } from "../../compoundComponents/sections";
import { SuggestionButton } from "../../subComponents/buttons";
import { Paper, Separator } from "../../subComponents/page";
import { BalanceInfo, H1, TextFieldLabel } from "../../subComponents/typography";

interface BalanceProps {
  readonly accountName: string;
  readonly balances: ReadonlyArray<BcpCoin>;
  readonly onSend: () => any;
  readonly onReceive: () => any;
  readonly onBackup: () => any;
}

const Wrapper = styled.div`
  width: 450px;
`;

const BalanceSection = styled.div`
  padding-top: 15px;
`;

export const BalanceForm = (props: BalanceProps) => (
  <Wrapper>
    <TransactionButtonGroup onSend={props.onSend} onReceive={props.onReceive} />
    <Paper>
      <H1 className="center sm">{props.accountName}</H1>
      <Separator />
      <TextFieldLabel className="centered">Your Currencies</TextFieldLabel>
      <BalanceSection>
        {props.balances.map((balance, idx) => (
          <BalanceInfo balance={balance} key={`balanceInfo_${idx}`} />
        ))}
      </BalanceSection>
    </Paper>
    <SuggestionButton
      suggestionText="Extra Security?"
      buttonText="Backup your account now"
      onClick={props.onBackup}
    />
  </Wrapper>
);
