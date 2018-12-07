import React from "react";
import styled from "styled-components";

import { get } from "lodash";

import { HeaderDropdown, Navigation, NavigationProps, NormalHeader } from "../../subComponents/headers";

import {
  NotificationMenuItem,
  PendingOnboarding,
  PendingTransactionProps,
  PendingTransactions,
  TransactionNotification,
  TransactionNotificationProps,
} from "../notifications";

const HeaderContent = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-left: 230px;
`;
const RightNavigation = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

interface HeaderProps {
  readonly navigationInfo: NavigationProps;
  readonly transactionInfo: TransactionNotificationProps;
  readonly pendingTransactionInfo: PendingTransactionProps;
  readonly visitedPending: boolean;
  readonly onGotIt: () => any;
  readonly onLogo: () => any;
  readonly resetTransactionList: () => any;
}

const getLastTransactionType = (transactionInfo: TransactionNotificationProps): string => {
  const { items } = transactionInfo;
  if (items.length > 0) {
    return get(items, `[${items.length - 1}].success`) ? "success" : "failed";
  }
  return "normal";
};

export class Header extends React.Component<HeaderProps> {
  public render(): any {
    const {
      navigationInfo,
      transactionInfo,
      pendingTransactionInfo,
      onLogo,
      onGotIt,
      visitedPending,
      resetTransactionList,
    } = this.props;
    const type = getLastTransactionType(transactionInfo);
    const hasPendingItems = pendingTransactionInfo.items.length > 0;
    return (
      <NormalHeader onLogo={onLogo}>
        <HeaderContent>
          <Navigation {...navigationInfo} />
          <RightNavigation>
            <NotificationMenuItem
              icon="loading"
              type={hasPendingItems ? "success" : "normal"}
              spin={hasPendingItems}
              notification={
                visitedPending ? (
                  <PendingTransactions {...pendingTransactionInfo} />
                ) : (
                  <PendingOnboarding onGotIt={onGotIt} />
                )
              }
            />
            <NotificationMenuItem
              type={type}
              icon="bell"
              notification={<TransactionNotification {...transactionInfo} />}
              onHidePopup={resetTransactionList}
            />
            <HeaderDropdown title="Hi!" />
          </RightNavigation>
        </HeaderContent>
      </NormalHeader>
    );
  }
}
