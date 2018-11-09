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
  readonly isFirst: boolean;
  readonly isLoadingPending?: boolean;
}

const getLastTransactionType = (transactionInfo: TransactionNotificationProps): string => {
  const { items } = transactionInfo;
  if (items.length > 0) {
    return get(items, `[${items.length - 1}].success`) ? "success" : "failed";
  }
  return "normal";
};

export const Header = (props: HeaderProps): JSX.Element => {
  const { navigationInfo, transactionInfo, pendingTransactionInfo, isFirst, isLoadingPending } = props;
  const type = getLastTransactionType(transactionInfo);
  return (
    <NormalHeader>
      <HeaderContent>
        <Navigation {...navigationInfo} />
        <RightNavigation>
          <NotificationMenuItem
            icon="loading"
            type="normal"
            spin={isLoadingPending}
            notification={
              isFirst ? <PendingOnboarding /> : <PendingTransactions {...pendingTransactionInfo} />
            }
          />
          <NotificationMenuItem
            type={type}
            icon="bell"
            notification={<TransactionNotification {...transactionInfo} />}
          />
          <HeaderDropdown title="Hi!" />
        </RightNavigation>
      </HeaderContent>
    </NormalHeader>
  );
};
