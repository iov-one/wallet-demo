import React from "react";
import styled from "styled-components";

import { ErrorNotification } from "../../subComponents/error";
import { NormalHeader } from "../../subComponents/headers";

interface PageProps {
  readonly children: JSX.Element;
  readonly whiteBg?: boolean;
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
  padding-top: 25px;
  overflow-x: scroll;
  &.whiteBg {
    background-color: transparent;
  }
  &.darkBg {
    background-color: #f9fafc;
  }
`;

export class PageStructure extends React.Component<PageProps> {
  private readonly networkError = React.createRef<ErrorNotification>();
  public componentDidMount(): any {
    window.addEventListener("online", this.updateOnlineStatus);
    window.addEventListener("offline", this.updateOnlineStatus);
  }
  public readonly updateOnlineStatus = (): any => {
    const node = this.networkError.current;
    if (navigator.onLine) {
      node!.hideNotification();
    } else {
      node!.showNotification();
    }
  };
  public render(): JSX.Element {
    const { whiteBg, children } = this.props;
    return (
      <Wrapper>
        <NormalHeader />
        <PageContent className={whiteBg ? "whiteBg" : "darkBg"}>
          <ErrorNotification type="network" ref={this.networkError} />
          {children}
        </PageContent>
      </Wrapper>
    );
  }
}
