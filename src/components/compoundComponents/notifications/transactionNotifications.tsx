import React from "react";
import styled from "styled-components";

import classNames from "classnames";

import {
  NotificationEmptyState,
  NotificationTitle,
  NotificationWrapper,
  TransactionNotificationItem,
} from "../../subComponents/notification";

import { TransNotificationProps } from "../../../reducers/notification";

export interface TransactionNotificationProps {
  readonly items: ReadonlyArray<TransNotificationProps>;
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

export const TransactionNotification = (props: TransactionNotificationProps) => (
  <NotificationWrapper>
    <NotificationTitle>Notifications</NotificationTitle>
    <Content className={classNames({ empty: props.items.length === 0 })}>
      {props.items.length > 0 ? (
        props.items.map((item, key) => <TransactionNotificationItem {...item} key={`notif_${key}`} />)
      ) : (
        <NotificationEmptyState type="noNotification" />
      )}
    </Content>
  </NotificationWrapper>
);
