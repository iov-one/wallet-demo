import React from "react";
import styled from "styled-components";

import {
  NotificationTitle,
  NotificationWrapper,
  TransactionNotificationItem,
  TransNotificationProps,
} from "../../subComponents/notification";

import { HeaderIcon } from "../../subComponents/headers";

export interface TransactionNotificationProps {
  readonly items: ReadonlyArray<TransNotificationProps>;
}

const Content = styled.div`
  background-color: #fcfcfc;
  padding: 0px 15px;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
`;

const Wrapper = styled.div`
  position: relative;
  display: inline-block;
  margin-right: 30px;
`;

const FadeWrapper = styled.div`
  position: absolute
  display: none;
  opacity: 0;
  transition: opacity 0.5s;
  right: -20px;
  ${Wrapper}:hover & {
    display: block;
    opacity: 1;
  }
  z-index: 9999;
`;

export const TransactionNotification = (props: TransactionNotificationProps) => (
  <Wrapper>
    <HeaderIcon icon="loading" />
    <FadeWrapper>
      <NotificationWrapper>
        <NotificationTitle>Notifications</NotificationTitle>
        <Content>
          {props.items.map((item, key) => (
            <TransactionNotificationItem {...item} key={`notif_${key}`} />
          ))}
        </Content>
      </NotificationWrapper>
    </FadeWrapper>
  </Wrapper>
);
