import React from "react";
import styled from "styled-components";

import {
  NotificationTitle,
  NotificationWrapper,
  PendingNotificationItem,
  PendingNotificationItemProps,
  PendingTransactionNotification,
} from "../../subComponents/notification";

import { HeaderIcon } from "../../subComponents/headers";

const Wrapper = styled.div`
  position: relative;
  display: inline-block;
  margin-right: 30px;
`;

const Content = styled.div`
  padding: 0px 15px;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
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

export interface PendingTransactionProps {
  readonly items: ReadonlyArray<PendingNotificationItemProps>;
}

export const PendingOnboarding = (): JSX.Element => (
  <Wrapper>
    <HeaderIcon icon="bell" />
    <FadeWrapper>
      <NotificationWrapper className="secondary">
        <PendingTransactionNotification />
      </NotificationWrapper>
    </FadeWrapper>
  </Wrapper>
);

export const PendingTransactions = (props: PendingTransactionProps) => (
  <Wrapper>
    <HeaderIcon icon="bell" />
    <FadeWrapper>
      <NotificationWrapper>
        <NotificationTitle>Pending transactions</NotificationTitle>
        <Content>
          {props.items.map((item, key) => (
            <PendingNotificationItem {...item} key={`notif_${key}`} />
          ))}
        </Content>
      </NotificationWrapper>
    </FadeWrapper>
  </Wrapper>
);
