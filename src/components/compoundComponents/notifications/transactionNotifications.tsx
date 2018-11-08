import React from "react";
import styled from "styled-components";

import {
  NotificationTitle,
  NotificationWrapper,
  TransactionNotificationItem,
  TransNotificationProps,
} from "../../subComponents/notification";

export interface TransactionNotificationProps {
  readonly items: ReadonlyArray<TransNotificationProps>;
}

const Content = styled.div`
  background-color: #fcfcfc;
  padding: 0px 15px;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
`;

export const TransactionNotification = (props: TransactionNotificationProps) => (
  <NotificationWrapper>
    <NotificationTitle>Notifications</NotificationTitle>
    <Content>
      {props.items.map((item, key) => (
        <TransactionNotificationItem {...item} key={`notif_${key}`} />
      ))}
    </Content>
  </NotificationWrapper>
);
