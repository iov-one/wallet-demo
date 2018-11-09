import React from "react";
import styled from "styled-components";

import {
  NotificationEmptyState,
  NotificationTitle,
  NotificationWrapper,
  PendingNotificationItem,
  PendingNotificationItemProps,
  PendingTransactionNotification,
} from "../../subComponents/notification";

const Content = styled.div`
  padding: 0px 15px;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
`;

export interface PendingTransactionProps {
  readonly items: ReadonlyArray<PendingNotificationItemProps>;
}

export interface PendingOnboardingProps {
  readonly onGotIt: () => any;
}

export const PendingOnboarding = (props: PendingOnboardingProps): JSX.Element => (
  <NotificationWrapper className="secondary">
    <PendingTransactionNotification onClick={props.onGotIt} />
  </NotificationWrapper>
);

export const PendingTransactions = (props: PendingTransactionProps) => (
  <NotificationWrapper>
    <NotificationTitle>Pending transactions</NotificationTitle>
    <Content>
      {props.items.length > 0 ? (
        props.items.map((item, key) => <PendingNotificationItem {...item} key={`notif_${key}`} />)
      ) : (
        <NotificationEmptyState type="noPending" />
      )}
    </Content>
  </NotificationWrapper>
);
