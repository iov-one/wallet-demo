import React from "react";
import styled from "styled-components";

import {
  NotificationTitle,
  NotificationWrapper,
  PendingNotificationItem,
  PendingNotificationItemProps,
  PendingTransactionNotification,
} from "../../subComponents/notification";

const Content = styled.div`
  padding: 0px 15px;
`;

interface PendingTransactionProps {
  readonly items: ReadonlyArray<PendingNotificationItemProps>;
}

export const PendingOnboarding = (): JSX.Element => (
  <NotificationWrapper className="secondary">
    <PendingTransactionNotification />
  </NotificationWrapper>
);

export const PendingTransactions = (props: PendingTransactionProps) => (
  <NotificationWrapper>
    <NotificationTitle>Pending transactions</NotificationTitle>
    <Content>
      {props.items.map((item, key) => (
        <PendingNotificationItem {...item} key={`notif_${key}`} />
      ))}
    </Content>
  </NotificationWrapper>
);
