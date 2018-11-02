import classNames from "classnames";
import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Input = styled.input`
  flex: 1;
  padding: 10px 12px;
  border-radius: 4px;
  border: solid 1px #e9eaf0;
  font-family: Open Sans;
  font-size: 20px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.6;
  letter-spacing: 0.8px;
  color: #1c1c1c;
  text-align: right;
  margin-right: 7px;
  &.hasError {
    border: solid 1px #ffa941;
    background-color: #fff1e1;
  }
  &:disabled {
    border: none;
    background-color: #f4f5f8;
  }
`;

const Unit = styled.div`
  display: inline-block;
  font-family: Open Sans;
  font-size: 20px;
  font-weight: 600;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.6;
  letter-spacing: 0.8px;
  color: #1c1c1c;
`;

export const TextInputWithUnit = (props: any): JSX.Element => {
  const className = classNames(props.align || "left", {
    hasError: props.hasError,
  });
  return (
    <Wrapper>
      <Input className={className} type="text" {...props} />
      <Unit>{props.unit}</Unit>
    </Wrapper>
  );
};
