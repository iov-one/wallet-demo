import React from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
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

interface HeaderDropdownProps extends RouteComponentProps<{}> {
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

class DropdownMenu extends React.Component<HeaderDropdownProps> {
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
  public readonly toSecurityCenter = (): void => {
    this.props.history.push("/security-center/");
  };
  public readonly toInviteScreen = (): void => {
    this.props.history.push("/invite/");
  };
  public readonly toTermsAndConditions = (): void => {
    this.props.history.push("/terms-and-conditions/");
  };
  public readonly toPrivacyPolicy = (): void => {
    this.props.history.push("/privacy-policy/");
  };
  public render(): any {
    const { show } = this.state;
    const { logout } = this.props;
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
                onClick={this.toSecurityCenter}
              />
              <HeaderDropdownMenuItem title="Invite friends" icon={HeartIcon} onClick={this.toInviteScreen} />
              <HeaderDropdownMenuItem
                title="Terms & Conditions"
                icon={TermsIcon}
                onClick={this.toTermsAndConditions}
              />
              <HeaderDropdownMenuItem
                title="Privacy Policy"
                icon={PrivacyIcon}
                onClick={this.toPrivacyPolicy}
              />
              <HeaderDropdownMenuItem title="Log out" icon={LogoutIcon} onClick={logout} />
            </React.Fragment>
          </HeaderDropdownWrapper>
        </FadeWrapper>
      </Wrapper>
    );
  }
}

export const HeaderDropdownMenu = withRouter(DropdownMenu);
