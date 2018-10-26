import { BcpCoin } from "@iov/bcp-types";
import React from "react";
import styled from "styled-components";

import { coinToString } from "../../../logic";
import { SendReceiveButton } from "../../subComponents/buttons";
import { AccountName, TokenValue } from "../../subComponents/typography";

interface AccountInfo {
  readonly name: string;
  readonly balances: ReadonlyArray<BcpCoin>;
  readonly onSend: () => any;
  readonly onReceive: () => any;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 570px;
  align-items: center;
  box-sizing: border-box;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 510px;
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

const FieldWrapper = styled.div`
  margin-bottom: 15px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const Backup = styled.a`
  margin-top: 30px;
  font-family: Open Sans;
  font-size: 16px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.63;
  letter-spacing: 0.7px;
  text-align: center;
  color: #8084a6;
  text-decoration: underline;
  cursor: pointer;
`;

export const AccountInfoSection = (props: AccountInfo) => {
  const { name, balances, onSend, onReceive } = props;
  return (
    <Container>
      <Wrapper>
        <AccountName>{name}</AccountName>
        <Content>
          {balances.map((balance, idx) => {
            const { whole, fractional, tokenTicker, tokenName } = balance;

            // TODO: seems that iov tokens say 6 sigfigs, but internally use 9... hmmm...
            const amount = coinToString({ whole, fractional, sigFigs: 9 });
            // const amount = coinToString({ whole, fractional, sigFigs});

            return (
              <FieldWrapper key={`balance_${idx}`}>
                <TokenValue amount={amount} tokenUnit={tokenTicker} info={tokenName} />
                <SendReceiveButton onReceive={onReceive} onSend={onSend} />
              </FieldWrapper>
            );
          })}
        </Content>
      </Wrapper>
      <Backup>Backup your account</Backup>
    </Container>
  );
};
