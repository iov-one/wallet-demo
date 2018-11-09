import React from "react";
import styled from "styled-components";

import classNames from "classnames";

import { HeaderIcon } from "../../subComponents/headers";

const Wrapper = styled.div`
  position: relative;
  display: inline-block;
  margin-right: 30px;
`;

const FadeWrapper = styled.div`
  position: absolute
  display: none;
  opacity: 0;
  transition: opacity 0.5s;
  right: -13px;
  &.show {
    display: block;
    opacity: 1;
  }
  z-index: 9999;
`;

const Button = styled.button`
  border: none;
  background: transparent;
  outline: none;
  cursor: pointer;
`;

interface MenuItemProps {
  readonly notification: JSX.Element;
  readonly icon: string;
  readonly spin?: boolean;
}

interface MenuItemState {
  readonly show: boolean;
}

export class NotificationMenuItem extends React.Component<MenuItemProps, MenuItemState> {
  public readonly state = {
    show: false,
  };
  public readonly wrapperRef = React.createRef<HTMLElement>();
  public componentDidMount(): any {
    document.addEventListener("mousedown", this.handleClick);
  }
  public componentWillUnmount(): any {
    document.removeEventListener("mousedown", this.handleClick);
  }
  public readonly handleClick = (event: any) => {
    if (this.wrapperRef.current && !this.wrapperRef.current.contains(event.target)) {
      this.setState({
        show: false,
      });
    }
  };
  public render(): any {
    const { icon, notification, spin } = this.props;
    const { show } = this.state;
    return (
      <Wrapper innerRef={this.wrapperRef}>
        <Button
          onClick={() => {
            this.setState({ show: true });
          }}
        >
          <HeaderIcon icon={icon} className={classNames({ show, spin })} />
        </Button>
        <FadeWrapper className={classNames({ show })}>{notification}</FadeWrapper>
      </Wrapper>
    );
  }
}
