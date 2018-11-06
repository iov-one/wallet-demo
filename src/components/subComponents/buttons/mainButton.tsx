import React from "react";
import styled from "styled-components";

import className from "classnames";

import { Spinner } from "../icons";

import Arrow from "../../../../resources/arrow.svg";
import Checkmark from "../../../../resources/check.svg";

interface ButtonProps {
  readonly type: string;
  readonly title: string;
  readonly large?: boolean;
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
  min-width: 114px;
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
  height: 42px;
  &.lg {
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
  const { type, title, onClick, disabled, loading, checked, isVertical, icon, large } = props;
  const classname = className({
    revert: type === "revert",
    primary: type === "primary",
    disabled: disabled,
    lg: large,
  });
  const wrapperClass = className({
    vertical: isVertical,
  });
  return (
    <ButtonWrapper className={wrapperClass} onClick={() => (disabled || !onClick ? "" : onClick())}>
      <ButtonContent className={classname}>
        {loading ? (
          <Spinner className={className({ lg: large })} />
        ) : (
          icon === "check" && checked && <CheckMarkIcon src={Checkmark} />
        )}
        {!(icon === "check" && checked) && (
          <ButtonTitle className={className({ revert: type === "revert" })}>{title}</ButtonTitle>
        )}
        {icon === "next" && <NextIcon src={Arrow} />}
      </ButtonContent>
    </ButtonWrapper>
  );
};
