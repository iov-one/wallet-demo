import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 36px;
  &:last-child {
    margin-bottom: 50px;
  }
`;

const InfoLabel = styled.div`
  flex: 1;
  text-align: left;
  font-family: Muli;
  font-size: 14px;
  font-weight: 600;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #1c1c1c;
`;

const InfoValue = styled.div`
  flex: 1;
  text-align: right;
  font-family: Muli;
  font-size: 20px;
  font-weight: 300;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #1c1c1c;
`;

export interface TransactionInfoProps {
  readonly label: string;
  readonly value: string;
}

export const TransactionInfo = (props: TransactionInfoProps) => (
  <Wrapper>
    <InfoLabel>{props.label}</InfoLabel>
    <InfoValue>{props.value}</InfoValue>
  </Wrapper>
);
