import React from "react";
import styled from "styled-components";

import { RouteComponentProps, withRouter } from "react-router";

import { connect } from "react-redux";

import { Header } from "../../compoundComponents/header";
import { Toasts } from "../../compoundComponents/toasts";

import {
  PendingTransactionProps,
  TransactionNotificationProps,
} from "../../compoundComponents/notifications";

import { NavItemInfo } from "../../subComponents/headers";

interface OwnProps extends RouteComponentProps<{}> {
  readonly children: JSX.Element;
  readonly whiteBg?: boolean;
  readonly activeNavigation?: string;
}

interface GeneratedProps {
  readonly pendingTransactionInfo: PendingTransactionProps;
  readonly transactionInfo: TransactionNotificationProps;
}

interface PageProps extends OwnProps, GeneratedProps {}

interface PageState {
  readonly isOffline: boolean;
}

const Wrapper = styled.div`
  display: flex;
  height: 100vh;
  flex-direction: column;
`;

const PageContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-x: scroll;
  &.whiteBg {
    background-color: transparent;
  }
  &.darkBg {
    background-color: #f9fafc;
  }
`;

class PageTemplate extends React.Component<PageProps, PageState> {
  public readonly state = {
    isOffline: false,
  };
  public componentDidMount(): any {
    window.addEventListener("online", this.updateOnlineStatus);
    window.addEventListener("offline", this.updateOnlineStatus);
  }
  public readonly updateOnlineStatus = (): any => {
    if (navigator.onLine) {
      this.setState({
        isOffline: false,
      });
    } else {
      this.setState({
        isOffline: true,
      });
    }
  };
  public render(): JSX.Element {
    const {
      whiteBg,
      children,
      activeNavigation,
      transactionInfo,
      pendingTransactionInfo,
      history,
    } = this.props;
    const { isOffline } = this.state;
    const navigationItems = [
      {
        label: "Balance",
        onClick: () => {
          history.push("/balance");
        },
      },
      {
        label: "Payments",
        onClick: () => {
          history.push("/payment");
        },
      },
    ] as ReadonlyArray<NavItemInfo>;
    const navigationInfo = {
      items: navigationItems,
      activeItem: activeNavigation,
    };
    return (
      <Wrapper>
        <Header
          navigationInfo={navigationInfo}
          transactionInfo={transactionInfo}
          pendingTransactionInfo={pendingTransactionInfo}
          isFirst
        />
        <PageContent className={whiteBg ? "whiteBg" : "darkBg"}>
          <Toasts type="network" show={isOffline} />
          {children}
        </PageContent>
      </Wrapper>
    );
  }
}

const mapStateToProps = (state: any, ownProps: OwnProps): PageProps => ({
  ...ownProps,
  transactionInfo: state.notification.transaction,
  pendingTransactionInfo: state.notification.pending,
});

export const PageStructure = withRouter(connect(mapStateToProps)(PageTemplate));
