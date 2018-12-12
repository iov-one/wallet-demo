import React from "react";
import styled from "styled-components";

import classNames from "classnames";

import {
  HeaderDropdown,
  HeaderDropdownMenuItem,
  HeaderDropdownWrapper,
} from "~/components/subComponents/headers";

import HeartIcon from "../../../../resources/heart.svg";
import LogoutIcon from "../../../../resources/logOut.svg";
import PrivacyIcon from "../../../../resources/privacyPolicy.svg";
import SecurityIcon from "../../../../resources/security.svg";
import TermsIcon from "../../../../resources/termsAndConditions.svg";

interface HeaderDropdownProps {
  readonly toSecurityCenter: () => void;
  readonly toInviteScreen: () => void;
  readonly toTermsAndConditions: () => void;
  readonly toPrivacyPolicy: () => void;
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
  public readonly showDropdown = (): void => {
    this.setState({ show: true });
  };
  public render(): any {
    const { show } = this.state;
    const { toSecurityCenter, toInviteScreen, toTermsAndConditions, toPrivacyPolicy, logout } = this.props;
    return (
      <Wrapper innerRef={this.wrapperRef}>
        <Button onMouseEnter={this.showDropdown}>
          <HeaderDropdown title="Hi!" />
        </Button>
        <FadeWrapper className={classNames({ show })}>
          <HeaderDropdownWrapper>
            <React.Fragment>
              <HeaderDropdownMenuItem
                title="Security Center"
                icon={SecurityIcon}
                onClick={toSecurityCenter}
              />
              <HeaderDropdownMenuItem title="Invite friends" icon={HeartIcon} onClick={toInviteScreen} />
              <HeaderDropdownMenuItem
                title="Terms & Conditions"
                icon={TermsIcon}
                onClick={toTermsAndConditions}
              />
              <HeaderDropdownMenuItem title="Privacy Policy" icon={PrivacyIcon} onClick={toPrivacyPolicy} />
              <HeaderDropdownMenuItem title="Log out" icon={LogoutIcon} onClick={logout} />
            </React.Fragment>
          </HeaderDropdownWrapper>
        </FadeWrapper>
      </Wrapper>
    );
  }
}
