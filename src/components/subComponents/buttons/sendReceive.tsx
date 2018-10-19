import React from "react";
import styled from "styled-components";

interface SendReceivProps {
  readonly onSend: () => any;
  readonly onReceive: () => any;
}

const Button = styled.button`
  font-family: Open Sans;
  font-size: 14px;
  font-weight: 600;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: 0px;
  text-align: center;
  color: #31e6c9;
  outline: none;
  background: transparent;
  border: none;
  cursor: pointer;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Splitter = styled.div`
  width: 1px;
  height: 26px;
  background-color: #e9eaf0;
  margin: 0px 21px;
`;

export const SendReceiveButton = (props: SendReceivProps): JSX.Element => (
  <Wrapper>
    <Button onClick={props.onSend}>Send</Button>
    <Splitter />
    <Button onClick={props.onReceive}>Receive</Button>
  </Wrapper>
);
