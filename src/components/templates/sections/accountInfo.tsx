import React from "react";
import styled from "styled-components";

import { AccountName, TokenValue } from "../../subComponents/typography";

interface AccountInfo {
  readonly name: string;
  readonly balances: ReadonlyArray<any>;
}

const Wrapper = styled.div`
  width: 510px;
  min-height: 450px;
  border-radius: 2px;
  box-shadow: 0 0 6px 0 #f3f4f8;
  background-color: #ffffff;
  padding: 30px;
`;

const Content = styled.div`
  margin-top: 30px;
`;

const FieldWrapper = styled.div`
  margin-bottom: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const AccountInfoSection = (props: AccountInfo) => {
  const { name, balances } = props;
  return (
    <Wrapper>
      <AccountName>{name}</AccountName>
      <Content>
        {balances.map((balance, idx) => {
          const { amount, tokenUnit, info } = balance;
          return (
            <FieldWrapper key={`balance_${idx}`}>
              <TokenValue amount={amount} tokenUnit={tokenUnit} info={info} />
            </FieldWrapper>
          );
        })}
      </Content>
    </Wrapper>
  );
};
