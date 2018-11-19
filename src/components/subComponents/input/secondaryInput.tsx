import React from "react";
import styled from "styled-components";

import classNames from "classnames";

import NoteIcon from "../../../../resources/note.svg";

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  box-sizing: border-box;
`;

const ContentWrapper = styled.div`
  display: flex;
  box-sizing: border-box;
  width: 100%;
  flex-direction: row;
  align-items: center;
  padding: 0px 20px;
  border-top: 1px solid #f3f3f3;
  border-bottom: 1px solid #f3f3f3;
  height: 77px;
`;

const Icon = styled.img`
  width: 15px;
  height: 15px;
  margin-right: 15px;
  &.disabled {
    opacity: 0.5;
  }
`;

const Input = styled.input`
  flex: 1;
  font-family: Muli;
  font-size: 14px;
  font-weight: 600;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #1c1c1c;
  &::placeholder {
    color: #b9bdcc;
  }
  &:disabled {
    color: #dcdee5;
  }
  border: none;
  outline: none;
`;

export const SecondaryInput = (props: any): JSX.Element => (
  <Wrapper>
    <ContentWrapper>
      <Icon src={NoteIcon} className={classNames({ disabled: props.disabled })} />
      <Input {...props} />
    </ContentWrapper>
  </Wrapper>
);
