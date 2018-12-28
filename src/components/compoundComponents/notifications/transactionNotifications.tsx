import React from "react";
import styled from "styled-components";

import classNames from "classnames";

import {
  NotificationEmptyState,
  NotificationTitle,
  NotificationWrapper,
  TransactionNotificationItem,
} from "../../subComponents/notification";

import { NotificationTx } from "~/reducers";

export interface TransactionNotificationProps {
  readonly items: ReadonlyArray<NotificationTx>;
}

const Content = styled.div`
  background-color: #fcfcfc;
  padding: 0px 15px;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  &.empty {
    background-color: #fff;
  }
`;

export const TransactionNotification = (props: TransactionNotificationProps) => {
  // tslint:disable-next-line:readonly-array
  const items = props.items.slice(0, 3);
  return (
    <NotificationWrapper>
      <NotificationTitle>Notifications</NotificationTitle>
      <Content className={classNames({ empty: items.length === 0 })}>
        {items.length > 0 ? (
          items.map((item, key) => <TransactionNotificationItem {...item} key={`notif_${key}`} />)
        ) : (
          <NotificationEmptyState type="noNotification" />
        )}
      </Content>
    </NotificationWrapper>
  );
};
