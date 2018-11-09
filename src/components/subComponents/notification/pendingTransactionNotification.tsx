import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  padding: 15px;
  width: 160px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const Text = styled.div`
  margin-bottom: 5px;
`;

const GotIt = styled.button`
  background: transparent;
  border: none;
  outline: none;
  text-decoration: underline;
  margin-right: 10px;
  font-family: Muli;
  font-size: 14px;
  font-weight: 600;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #ffffff;
  cursor: pointer;
`;

interface Props {
  readonly onClick: () => any;
}

export const PendingTransactionNotification = (props: Props): JSX.Element => (
  <Wrapper>
    <Text>Pending transactions will appear here</Text>
    <GotIt onClick={props.onClick}>Got it</GotIt>
  </Wrapper>
);
