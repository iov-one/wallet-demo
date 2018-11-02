import React from "react";
import styled from "styled-components";

import { Spinner } from "../icons";

interface ButtonProps {
  readonly title: string;
  readonly disabled?: boolean;
  readonly loading?: boolean;
  readonly onClick: () => any;
}

const ButtonWrapper = styled.div`
  display: inline-block;
  margin-right: 10px;
`;

const ButtonContent = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 16px 36px;
  border-radius: 6.7px;
  cursor: pointer;
  background-color: transparent;
  &:hover {
    background-color: #f3f3f3;
    color: white !important;
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
  color: #31e6c9;
`;

export const RevertButton = (props: ButtonProps): JSX.Element => {
  const { title, onClick, disabled, loading } = props;
  return (
    <ButtonWrapper onClick={() => (disabled ? "" : onClick())}>
      <ButtonContent className={disabled ? "disabled" : "active"}>
        <ButtonTitle>{title}</ButtonTitle>
        {loading ? <Spinner /> : ""}
      </ButtonContent>
    </ButtonWrapper>
  );
};
