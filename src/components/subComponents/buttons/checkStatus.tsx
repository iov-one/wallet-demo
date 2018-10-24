import React from "react";
import styled from "styled-components";

import Checkmark from "../../../../resources/checkmark@3x.png";

interface ButtonProps {
  readonly title: string;
  readonly checked?: boolean;
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
  height: 53px;
  box-sizing: border-box;
  padding: 16px 36px;
  border-radius: 6.7px;
  cursor: pointer;
  background-color: #31e6c9;
`;
const ButtonTitle = styled.div`
  font-family: Open Sans;
  font-size: 20px;
  font-weight: 600;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.3;
  letter-spacing: 0.8px;
  color: #ffffff;
`;
const ButtonIcon = styled.img`
  width: 22.7px;
  height: 17px;
  object-fit: contain;
`;

export const CheckStatusButton = (props: ButtonProps): JSX.Element => {
  const { title, onClick, checked } = props;
  return (
    <ButtonWrapper onClick={onClick}>
      <ButtonContent>
        {checked ? <ButtonIcon src={Checkmark} /> : <ButtonTitle>{title}</ButtonTitle>}
      </ButtonContent>
    </ButtonWrapper>
  );
};
