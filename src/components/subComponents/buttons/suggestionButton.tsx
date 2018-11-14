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
  margin-top: 30px;
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

export interface SuggestionButtonProps {
  readonly suggestionText: string;
  readonly buttonText: string;
  readonly onClick: () => any;
}

export const SuggestionButton = (props: SuggestionButtonProps) => (
  <Wrapper>
    <Text>{props.suggestionText}</Text>
    <Button onClick={props.onClick}>{props.buttonText}</Button>
  </Wrapper>
);
