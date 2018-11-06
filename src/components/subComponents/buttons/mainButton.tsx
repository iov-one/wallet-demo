import React from "react";
import styled from "styled-components";

import className from "classnames";

import { Spinner } from "../icons";

import Arrow from "../../../../resources/arrow.png";
import Checkmark from "../../../../resources/checkmark@3x.png";

interface ButtonProps {
  readonly type: string;
  readonly title: string;
  readonly icon?: string;
  readonly disabled?: boolean;
  readonly checked?: boolean;
  readonly loading?: boolean;
  readonly isVertical?: boolean;
  readonly onClick?: () => any;
}

const ButtonWrapper = styled.div`
  display: inline-block;
  margin: 0px 8px;
  &:first-child {
    margin-left: 0px;
  }
  &:last-child {
    margin-right: 0px;
  }
  &.vertical {
    margin: 8px 0px;
    &:first-child {
      margin-top: 0px;
    }
    &:last-child {
      margin-bottom: 0px;
    }
  }
`;

const ButtonContent = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 11px 27px;
  border-radius: 4.7px;
  cursor: pointer;
  background-color: #31e6c9;
  &:hover {
    background-color: #2cd0b6;
  }
  &.disabled {
    opacity: 0.5;
    background-color: #31e6c9;
    &:hover {
      background-color: #31e6c9;
    }
  }
  &.revert {
    background-color: transparent;
    &:hover {
      background-color: #f3f3f3;
      color: white !important;
    }
  }
  &.hasIcon {
    height: 50px;
  }
`;
const ButtonTitle = styled.div`
  font-family: Muli;
  font-size: 16px;
  font-weight: 600;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: 0px;
  text-align: center;
  color: #ffffff;
  &.revert {
    color: #31e6c9;
  }
`;

const CheckMarkIcon = styled.img`
  width: 22.7px;
  height: 17px;
  object-fit: contain;
  margin-right: 3px;
`;

const NextIcon = styled.img`
  width: 16px;
  height: 15px;
  object-fit: contain;
  margin-left: 12px;
`;

export const Button = (props: ButtonProps): JSX.Element => {
  const { type, title, onClick, disabled, loading, checked, isVertical, icon } = props;
  const classname = className({
    revert: type === "revert",
    primary: type === "primary",
    disabled: disabled,
    hasIcon: icon,
  });
  const wrapperClass = className({
    vertical: isVertical,
  });
  return (
    <ButtonWrapper className={wrapperClass} onClick={() => (disabled || !onClick ? "" : onClick())}>
      <ButtonContent className={classname}>
        {icon === "check" && checked && <CheckMarkIcon src={Checkmark} />}
        <ButtonTitle className={className({ revert: type === "revert" })}>{title}</ButtonTitle>
        {loading ? <Spinner /> : icon === "next" && <NextIcon src={Arrow} />}
      </ButtonContent>
    </ButtonWrapper>
  );
};
