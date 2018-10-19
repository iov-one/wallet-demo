import React from "react";
import styled from "styled-components";

import { H1 } from "../../subComponents/typography";

interface FormProps {
  readonly title: string;
  readonly content: JSX.Element;
  readonly actions: JSX.Element;
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 450px;
`;

const FormTitleContainer = styled.div`
  margin-bottom: 25px;
  width: 100%;
`;

const FormContentContainer = styled.div`
  margin-bottom: 100px;
  width: 100%;
`;

const FormActionContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
`;

export const FormStructure = (props: FormProps): JSX.Element => {
  const { title, content, actions } = props;
  return (
    <Wrapper>
      <FormTitleContainer>
        <H1>{title}</H1>
      </FormTitleContainer>
      <FormContentContainer>{content}</FormContentContainer>
      <FormActionContainer>{actions}</FormActionContainer>
    </Wrapper>
  );
};
