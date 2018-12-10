import React from "react";
import styled from "styled-components";

import classNames from "classnames";

import {
  HeaderDropdown,
  HeaderDropdownMenuItem,
  HeaderDropdownWrapper,
} from "~/components/subComponents/headers";

import HeartIcon from "../../../../resources/heart.svg";

interface HeaderDropdownProps {
  readonly toSecurityCenter: () => void;
  readonly toInviteScreen: () => void;
  readonly logout: () => void;
}

const Wrapper = styled.div`
  position: relative;
  display: inline-block;
`;

const FadeWrapper = styled.div`
  position: absolute
  display: none;
  opacity: 0;
  transition: opacity 0.5s;
  right: -32px;
  margin-top: 22px;
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

export class HeaderDropdownMenu extends React.Component<HeaderDropdownProps> {
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
  public readonly goToSecurityCenter = () => {
    console.log("to security center");
  };
  public readonly toInviteScreen = () => {
    console.log("to invite screen");
  };
  public readonly logout = () => {
    console.log("log out");
  };
  public render(): any {
    const { show } = this.state;
    const { toSecurityCenter, toInviteScreen, logout } = this.props;
    return (
      <Wrapper innerRef={this.wrapperRef}>
        <Button
          onClick={() => {
            this.setState({ show: true });
          }}
        >
          <HeaderDropdown title="Hi!" />
        </Button>
        <FadeWrapper className={classNames({ show })}>
          <HeaderDropdownWrapper>
            <React.Fragment>
              <HeaderDropdownMenuItem title="Security Center" icon={HeartIcon} onClick={toSecurityCenter} />
              <HeaderDropdownMenuItem title="Invite friends" icon={HeartIcon} onClick={toInviteScreen} />
              <HeaderDropdownMenuItem title="Log out" icon={HeartIcon} onClick={logout} />
            </React.Fragment>
          </HeaderDropdownWrapper>
        </FadeWrapper>
      </Wrapper>
    );
  }
}
