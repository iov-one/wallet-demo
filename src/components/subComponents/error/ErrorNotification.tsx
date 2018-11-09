import React from "react";
import styled from "styled-components";

import classNames from "classnames";

import NetworkIcon from "../../../../resources/no_connection_circle.svg";
import TansactionIcon from "../../../../resources/transaction_fail_circle.svg";

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  opacity: 0;
  width: 510px;
  min-height: 0px;
  padding: 15px 20px;
  margin-bottom: 0px;
  border-radius: 2px;
  box-shadow: 0 0 6px 0 #f3f4fb;
  background-color: #ffffff;
  transition: all 0.5s;
  &.show {
    opacity: 1;
    min-height: 90px;
    margin-bottom: 20px;
  }
`;

const Icon = styled.img`
  width: 60px;
  height: 60px;
`;

const Text = styled.div`
  margin-left: 20px;
  margin-right: 20px;
  width: 340px;
  display: flex;
  flex-direction: row;
  align-items: center;
  font-family: Open Sans;
  font-size: 16px;
  font-weight: 600;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.63;
  letter-spacing: 0.7px;
`;

const CloseButton = styled.button`
  outline: none;
  cursor: pointer;
  background: transparent;
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  font-family: Open Sans;
  font-size: 20px;
  color: #d5d9db;
  &:hover {
    background-color: #f6f7f9;
  }
`;

interface ErrorNotificationProps {
  readonly type: string;
  readonly auto?: boolean;
  readonly hideAfter?: number;
  readonly show?: boolean;
}

interface ErrorNotificationState {
  readonly show: boolean;
}

export class ErrorNotification extends React.Component<ErrorNotificationProps, ErrorNotificationState> {
  public readonly state = {
    show: false,
  };
  public componentWillReceiveProps(nextProps: ErrorNotificationProps): any {
    if (nextProps.show !== this.props.show) {
      const { show } = nextProps;
      if (show !== undefined) {
        this.setState({
          show,
        });
      }
    }
  }
  public readonly hideNotification = (): any => {
    this.setState({
      show: false,
    });
  };
  public render(): JSX.Element {
    const { type } = this.props;
    const { show } = this.state;
    const IconSource = type === "network" ? NetworkIcon : TansactionIcon;
    const textColor = type === "network" ? "#ffb968" : "#f05956";
    const text =
      type === "network" ? "No network connection to the blockchains" : "Transaction rejected by blockchain";
    return (
      <Wrapper className={classNames({ show: show })}>
        <Icon src={IconSource} />
        <Text style={{ color: textColor }}>{text}</Text>
        <CloseButton onClick={this.hideNotification}>X</CloseButton>
      </Wrapper>
    );
  }
}
