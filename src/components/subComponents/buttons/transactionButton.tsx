import React from "react";
import styled from "styled-components";

import ReceiveIcon from "../../../../resources/receive_transaction@3x.png";
import SendIcon from "../../../../resources/send_transaction@3x.png";

const Button = styled.button`
  outline: none;
  border: none;
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  margin: 16px 8px;
  height: 89px;
  border-radius: 5px;
  box-shadow: 0 6px 14px 0 #edeff4;
  transition: box-shadow 0.5s;
  background-color: #ffffff;
  cursor: pointer;
  &:first-child {
    margin-left: 0px !important;
  }
  &:last-child {
    margin-right: 0px !important;
  }
  &:hover {
    box-shadow: 0 3px 7px 0 #edeff4;
  }
`;

const Icon = styled.img`
  width: 36px;
  height: 36px;
  margin-top: 13px;
  margin-bottom: 7px;
`;

const ButtonText = styled.div`
  font-family: Muli;
  font-size: 14px;
  font-weight: 600;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #1c1c1c;
`;

interface ButtonProps {
  readonly title: string;
  readonly type: string;
  readonly onClick: () => any;
}

export const TransactionButton = (props: ButtonProps) => (
  <Button onClick={props.onClick}>
    <Icon src={props.type === "send" ? SendIcon : ReceiveIcon} />
    <ButtonText>{props.title}</ButtonText>
  </Button>
);
