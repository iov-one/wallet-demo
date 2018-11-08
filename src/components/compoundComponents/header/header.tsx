import React from "react";
import styled from "styled-components";

import { HeaderDropdown, Navigation, NavigationProps, NormalHeader } from "../../subComponents/headers";

import {
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
}

export const Header = (props: HeaderProps): JSX.Element => {
  const { navigationInfo, transactionInfo, pendingTransactionInfo, isFirst } = props;
  return (
    <NormalHeader>
      <HeaderContent>
        <Navigation {...navigationInfo} />
        <RightNavigation>
          <TransactionNotification {...transactionInfo} />
          {isFirst ? <PendingOnboarding /> : <PendingTransactions {...pendingTransactionInfo} />}
          <HeaderDropdown title="Hi!" />
        </RightNavigation>
      </HeaderContent>
    </NormalHeader>
  );
};
