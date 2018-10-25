import React from "react";
import styled from "styled-components";

interface ButtonProps {
  readonly title: string;
  readonly disabled?: boolean;
  readonly onClick: () => any;
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
  &:hover {
    background-color: #2cd0b6;
  }
  &.disabled {
    background-color: #31e6c9;
    &:hover {
      background-color: #31e6c9;
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
`;

export const PrimaryButton = (props: ButtonProps): JSX.Element => {
  const { title, onClick, disabled } = props;
  return (
    <ButtonWrapper onClick={onClick}>
      <ButtonContent className={disabled ? "disabled" : "active"}>
        <ButtonTitle>{title}</ButtonTitle>
      </ButtonContent>
    </ButtonWrapper>
  );
};
