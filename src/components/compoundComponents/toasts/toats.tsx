import React from "react";
import styled from "styled-components";

import { get } from "lodash";

import classNames from "classnames";

import { ToastsText } from "../../subComponents/typography";

import CheckIcon from "../../../../resources/check.svg";
import CloseIcon from "../../../../resources/close.svg";
import EmailIcon from "../../../../resources/email_circle_icon.svg";
import NetworkIcon from "../../../../resources/no_connection_circle.svg";
import TransactionIcon from "../../../../resources/transaction_fail_circle.svg";

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  opacity: 0;
  width: 510px;
  max-height: 0px;
  padding: 0px 20px;
  margin-top: 0px;
  margin-bottom: 0px;
  border-radius: 2px;
  box-shadow: 0 0 6px 0 #f3f4fb;
  background-color: #ffffff;
  transition: all 0.5s;
  &.show {
    opacity: 1;
    max-height: 90px;
    margin-top: 20px;
    margin-bottom: 20px;
    padding: 15px 20px;
  }
`;

const Icon = styled.img`
  width: 60px;
  height: 60px;
`;

const IconWrapper = styled.div`
  display: inline-block;
  position: relative;
`;

const CheckImg = styled.div`
  width: 25px;
  height: 25px;
  background-color: #09d69e;
  border-radius: 50%;
  background-repeat: no-repeat;
  background-image: url(${CheckIcon});
  background-size: 14px 10px;
  background-position: center;
  position: absolute;
  right: -4px;
  top: -4px;
`;

const CloseButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  outline: none;
  cursor: pointer;
  background: transparent;
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  color: #d5d9db;
  &:hover {
    background-color: #f6f7f9;
  }
`;

const CloseImg = styled.img`
  width: 20px;
  height: 20px;
`;

interface ToatsProps {
  readonly type: string;
  readonly auto?: boolean;
  readonly hideAfter?: number;
  readonly show?: boolean;
}

interface ToastsState {
  readonly show: boolean;
}

const toastContent = {
  network: {
    icon: NetworkIcon,
    text: "No network connection to the blockchains",
    textColor: "#ffb968",
  },
  transaction: {
    icon: TransactionIcon,
    text: "Transaction rejected by blockchain",
    textColor: "#f05956",
  },
  emailVerification: {
    icon: EmailIcon,
    text: "Email has been successfully verified ",
    textColor: "#09d69e",
  },
};

export class Toasts extends React.Component<ToatsProps, ToastsState> {
  public readonly state = {
    show: false,
  };
  constructor(props: ToatsProps) {
    super(props);
    this.state = {
      show: props.show || false,
    };
  }
  public componentWillReceiveProps(nextProps: ToatsProps): any {
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
    const { icon, text, textColor } = get(toastContent, type);
    return (
      <Wrapper className={classNames({ show: show })}>
        <IconWrapper>
          <Icon src={icon} />
          {type === "emailVerification" && <CheckImg />}
        </IconWrapper>
        <ToastsText style={{ color: textColor, margin: "0px 20px", flex: 1 }}>{text}</ToastsText>
        <CloseButton onClick={this.hideNotification}>
          <CloseImg src={CloseIcon} />
        </CloseButton>
      </Wrapper>
    );
  }
}
