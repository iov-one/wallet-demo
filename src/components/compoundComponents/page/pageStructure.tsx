import React from "react";
import styled from "styled-components";

import { NormalHeader } from "../../subComponents/headers";
import { Toasts } from "../toasts";

interface PageProps {
  readonly children: JSX.Element;
  readonly whiteBg?: boolean;
}

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

export class PageStructure extends React.Component<PageProps, PageState> {
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
    const { whiteBg, children } = this.props;
    const { isOffline } = this.state;
    return (
      <Wrapper>
        <NormalHeader />
        <PageContent className={whiteBg ? "whiteBg" : "darkBg"}>
          <Toasts type="network" show={isOffline} />
          {children}
        </PageContent>
      </Wrapper>
    );
  }
}
