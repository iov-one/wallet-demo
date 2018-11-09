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
}

interface HeaderState {
  readonly isFirst: boolean;
}

const getLastTransactionType = (transactionInfo: TransactionNotificationProps): string => {
  const { items } = transactionInfo;
  if (items.length > 0) {
    return get(items, `[${items.length - 1}].success`) ? "success" : "failed";
  }
  return "normal";
};

export class Header extends React.Component<HeaderProps, HeaderState> {
  public readonly state: HeaderState;
  constructor(props: HeaderProps) {
    super(props);
    this.state = {
      isFirst: props.isFirst,
    };
  }
  public render(): any {
    const { navigationInfo, transactionInfo, pendingTransactionInfo } = this.props;
    const type = getLastTransactionType(transactionInfo);
    const hasPendingItems = pendingTransactionInfo.items.length > 0;
    const { isFirst } = this.state;
    return (
      <NormalHeader>
        <HeaderContent>
          <Navigation {...navigationInfo} />
          <RightNavigation>
            <NotificationMenuItem
              icon="loading"
              type="normal"
              spin={hasPendingItems}
              notification={
                isFirst ? (
                  <PendingOnboarding
                    onGotIt={() => {
                      this.setState({ isFirst: false });
                    }}
                  />
                ) : (
                  <PendingTransactions {...pendingTransactionInfo} />
                )
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
  }
}
