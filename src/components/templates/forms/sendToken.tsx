import { FungibleToken } from "@iov/bcp-types";
import React from "react";
import styled from "styled-components";

import { InputField } from "../../compoundComponents/form";
import { PrimaryButton } from "../../subComponents/buttons";
import { AccountBalance, AccountName } from "../../subComponents/typography";

interface AccountInfo {
  readonly name: string;
  readonly balance: FungibleToken;
}

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

export const SendTokenForm = (props: AccountInfo) => {
  const { name, balance } = props;
  return (
    <Container>
      <Wrapper>
        <AccountName className="noBorder">{name}</AccountName>
        <AccountBalance balance={balance} />
        <Content>
          <InputField title="To:" placeholder="IOV address" />
          <InputField title="Amount:" placeholder="1000" unit="IOV" />
          <InputField title="Memo:" placeholder="Save the forest" />
        </Content>
      </Wrapper>
      <ActionWrapper>
        <PrimaryButton
          title="Send"
          onClick={() => {
            console.log("send");
          }}
        />
      </ActionWrapper>
    </Container>
  );
};
