import React from "react";
import styled from "styled-components";

import className from "classnames";

import { Spinner } from "../icons";

import Arrow from "../../../../resources/arrow.png";
import Checkmark from "../../../../resources/checkmark@3x.png";

interface ButtonProps {
  readonly type: string;
  readonly title: string;
  readonly disabled?: boolean;
  readonly checked?: boolean;
  readonly loading?: boolean;
  readonly onClick?: () => any;
}

const ButtonWrapper = styled.div`
  display: inline-block;
`;

const ButtonContent = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 16px 36px;
  border-radius: 6.7px;
  cursor: pointer;
  background-color: #31e6c9;
  margin: 0px 10px;
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
`;
const ButtonTitle = styled.div`
  font-family: Open Sans;
  font-size: 17.9px;
  font-weight: 600;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: 0px;
  text-align: center;
  color: #fefefe;
  &.revert {
    color: #31e6c9;
  }
`;

const CheckMarkIcon = styled.img`
  width: 22.7px;
  height: 17px;
  object-fit: contain;
`;

const NextIcon = styled.img`
  width: 16px;
  height: 15px;
  object-fit: contain;
  margin-left: 12px;
`;

export const Button = (props: ButtonProps): JSX.Element => {
  const { type, title, onClick, disabled, loading, checked } = props;
  const classname = className({
    revert: type === "revert",
    primary: type === "primary" || type === "checkStatus" || type === "next",
    disabled: disabled,
  });
  return (
    <ButtonWrapper onClick={() => (disabled || !onClick ? "" : onClick())}>
      <ButtonContent className={classname}>
        {type === "checkStatus" && checked && <CheckMarkIcon src={Checkmark} />}
        <ButtonTitle className={className({ revert: type === "revert" })}>{title}</ButtonTitle>
        {loading ? <Spinner /> : type === "next" && <NextIcon src={Arrow} />}
      </ButtonContent>
    </ButtonWrapper>
  );
};
