import React from "react";
import styled from "styled-components";

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

export const Header = (props: HeaderProps): JSX.Element => {
  const { navigationInfo, transactionInfo, pendingTransactionInfo, isFirst, isLoadingPending } = props;
  return (
    <NormalHeader>
      <HeaderContent>
        <Navigation {...navigationInfo} />
        <RightNavigation>
          <NotificationMenuItem
            icon="loading"
            spin={isLoadingPending}
            notification={
              isFirst ? <PendingOnboarding /> : <PendingTransactions {...pendingTransactionInfo} />
            }
          />
          <NotificationMenuItem icon="bell" notification={<TransactionNotification {...transactionInfo} />} />
          <HeaderDropdown title="Hi!" />
        </RightNavigation>
      </HeaderContent>
    </NormalHeader>
  );
};
