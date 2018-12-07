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
  right: -16px;
  margin-top: 8px;
  &.show {
    display: block;
    opacity: 1;
  }
  z-index: 9999;
`;

const Button = styled.button`
  display: flex;
  flex-direction: row;
  align-items: center;
  justiy-content: center;
  border: none;
  background: transparent;
  outline: none;
  cursor: pointer;
  padding: 0px;
  width: 20px;
  height: 20px;
  &::before {
    content: " ";
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background-color: transparent;
    position: absolute;
    top: -4px;
    right: -3px;
  }
  &.loading::before {
    right: -8px;
  }
  &.success::before {
    background-color: #4be9d0;
  }
  &.failed::before {
    background-color: #f05956;
  }
`;

interface MenuItemProps {
  readonly notification: JSX.Element;
  readonly icon: string;
  readonly type?: string;
  readonly spin?: boolean;
  readonly onHidePopup?: () => any;
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
    const { onHidePopup } = this.props;
    if (this.wrapperRef.current && !this.wrapperRef.current.contains(event.target)) {
      this.setState({
        show: false,
      });
      if (onHidePopup) {
        onHidePopup();
      }
    }
  };
  public readonly handleIconClick = () => {
    const { show } = this.state;
    const { onHidePopup } = this.props;
    this.setState({
      show: !show,
    });
    if (show && onHidePopup) {
      onHidePopup();
    }
  };
  public render(): any {
    const { icon, notification, spin, type } = this.props;
    const { show } = this.state;
    return (
      <Wrapper innerRef={this.wrapperRef}>
        <Button onClick={this.handleIconClick} className={classNames(type, icon)}>
          <HeaderIcon icon={icon} className={classNames(type, { active: show, spin })} />
        </Button>
        <FadeWrapper className={classNames({ show })}>{notification}</FadeWrapper>
      </Wrapper>
    );
  }
}
