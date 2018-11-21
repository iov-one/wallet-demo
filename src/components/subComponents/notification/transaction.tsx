import React from "react";
import styled from "styled-components";

import { TransNotificationProps } from "../../../reducers/notification";

import ReceiveIcon from "../../../../resources/receive_transaction.svg";
import SendIcon from "../../../../resources/send_transaction.svg";

const Content = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
`;

const Wrapper = styled.div`
  padding: 15px 0px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid #f3f3f3;
  &:last-child {
    border-bottom: none;
  }
`;

const Icon = styled.img`
  width: 32px;
  height: 32px;
  object-fit: contain;
  margin-right: 18px;
`;

const TransInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const Message = styled.div`
  width: 222px;
  height: 20px;
  font-family: Muli;
  font-size: 14px;
  font-weight: 300;
  font-style: normal;
  font-stretch: normal;
  line-height: 18px;
  letter-spacing: normal;
  color: #1c1c1c;
  margin-bottom: 5px;
`;

const Bold = styled.span`
  font-weight: 600;
`;

const Time = styled.div`
  font-family: Muli;
  font-size: 12px;
  font-weight: 600;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #dadada;
`;

export const TransactionNotificationItem = (props: TransNotificationProps): JSX.Element => (
  <Wrapper>
    <Content>
      <Icon src={props.received ? ReceiveIcon : SendIcon} />
      <TransInfo>
        {props.success ? (
          <Message>
            {props.received ? <Bold>{props.sender}</Bold> : "You"} sent{" "}
            {props.received ? "you" : <Bold>{props.receiver}</Bold>}{" "}
            <Bold>
              {props.amount.whole}.{props.amount.fractional} {props.amount.tokenTicker}
            </Bold>
          </Message>
        ) : (
          <Message>
            Your payment to <Bold>{props.receiver}</Bold> is failed
          </Message>
        )}
        <Time>time</Time>
      </TransInfo>
    </Content>
  </Wrapper>
);
