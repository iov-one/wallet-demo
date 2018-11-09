import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: Muli;
  font-size: 16px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: 24.4px;
  letter-spacing: normal;
`;

const Text = styled.div`
  color: #1c1c1c;
`;

const Button = styled.button`
  font-family: Muli;
  font-size: 16px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: 24.4px;
  letter-spacing: normal;
  color: #31e6c9;
  text-decoration: underline;
  outline: none;
  border: none;
  background: transparent;
  cursor: pointer;
`;

interface ButtonProps {
  readonly onClick: () => any;
}

export const BackupAccountButton = (props: ButtonProps) => (
  <Wrapper>
    <Text>Extra Security?</Text>
    <Button onClick={props.onClick}>Backup your account now</Button>
  </Wrapper>
);
