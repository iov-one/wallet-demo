import { isEmpty } from "lodash";
import * as React from "react";
import { connect } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router";
import styled from "styled-components";
import {
  PendingTransactionProps,
  TransactionNotificationProps,
} from "~/components/compoundComponents/notifications";
import { Toasts } from "~/components/compoundComponents/toasts";
import Header from "~/components/Header";

interface OwnProps extends RouteComponentProps<{}> {
  readonly children: JSX.Element;
  readonly whiteBg?: boolean;
  readonly activeNavigation?: string;
}

interface GeneratedProps {
  readonly pendingTransactionInfo?: PendingTransactionProps;
  readonly transactionInfo?: TransactionNotificationProps;
  readonly transactionError?: string;
}

interface BaseProps extends OwnProps, GeneratedProps {}

interface PageProps extends OwnProps, GeneratedProps {}

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
  public readonly logout = (): any => {
    console.log("logout");
  };
  public render(): JSX.Element {
    const { whiteBg, children, transactionError } = this.props;
    const { isOffline } = this.state;

    return (
      <Wrapper>
        <Header />
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
});

export const PageStructure = withRouter(connect(mapStateToProps)(PageTemplate));
