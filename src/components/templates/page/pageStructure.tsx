import React from "react";
import styled from "styled-components";

import { RouteComponentProps, withRouter } from "react-router";

import { isEmpty } from "lodash";

import { connect } from "react-redux";

import { Header } from "../../compoundComponents/header";
import { Toasts } from "../../compoundComponents/toasts";

import {
  PendingTransactionProps,
  TransactionNotificationProps,
} from "../../compoundComponents/notifications";

import { NavItemInfo } from "../../subComponents/headers";

import { pendingTransactionVisited } from "../../../reducers/notification";

interface OwnProps extends RouteComponentProps<{}> {
  readonly children: JSX.Element;
  readonly whiteBg?: boolean;
  readonly activeNavigation?: string;
}

interface GeneratedProps {
  readonly pendingTransactionInfo: PendingTransactionProps;
  readonly transactionInfo: TransactionNotificationProps;
  readonly transactionError: string;
  readonly visitedPending: boolean;
}

interface GeneratedFunctionProps {
  readonly pendingVisited: () => any;
}

interface BaseProps extends OwnProps, GeneratedProps {}

interface PageProps extends OwnProps, GeneratedProps, GeneratedFunctionProps {}

interface PageState {
  readonly isOffline: boolean;
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const PageContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  &.whiteBg {
    background-color: transparent;
  }
  &.darkBg {
    background-color: #f9fafc;
  }
  margin-top: 71px;
  min-height: calc(100vh - 71px);
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
      visitedPending,
      transactionError,
      pendingVisited,
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
          visitedPending={visitedPending}
          onLogo={() => history.push("/balance")}
          onGotIt={pendingVisited}
        />
        <PageContent className={whiteBg ? "whiteBg" : "darkBg"}>
          <Toasts type="network" show={isOffline} />
          <Toasts type="transaction" show={!isEmpty(transactionError)} />
          {children}
        </PageContent>
      </Wrapper>
    );
  }
}

const mapStateToProps = (state: any, ownProps: OwnProps): BaseProps => ({
  ...ownProps,
  transactionInfo: { items: state.notification.transaction },
  pendingTransactionInfo: { items: state.notification.pending },
  transactionError: state.notification.transactionError,
  visitedPending: state.notification.visitedPending,
});

const mapDispatchToProps = (dispatch: any) => ({
  pendingVisited: () => dispatch(pendingTransactionVisited()),
});

export const PageStructure = withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(PageTemplate),
);
