import { Amount } from "@iov/bcp-types";
import React from "react";
import styled from "styled-components";

const BalanceText = styled.div`
  font-family: Open Sans;
  font-size: 20px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.6;
  letter-spacing: 0.8px;
  color: #1c1c1c;
  text-align: center;
  width: 100%;
`;

interface PropType {
  readonly balance: Amount;
}

export const AccountBalance = (props: PropType): JSX.Element => {
  const {
    balance: { whole, fractional, tokenTicker },
  } = props;
  return <BalanceText>{`Balance ${whole}.${fractional} ${tokenTicker}`}</BalanceText>;
};
