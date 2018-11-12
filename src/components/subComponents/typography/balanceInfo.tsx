import React from "react";
import styled from "styled-components";

import { BcpCoin } from "@iov/bcp-types";

const InfoText = styled.div`
  text-align: center;
  font-family: Muli;
  font-size: 20px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #31e6c9;
  text-decoration: underline;
  cursor: pointer;
  margin-top: 15px;
`;

interface BalanceProps {
  readonly balance: BcpCoin;
}

export const BalanceInfo = (props: BalanceProps) => (
  <InfoText>
    {props.balance.whole}.{props.balance.fractional} {props.balance.tokenTicker}
  </InfoText>
);
