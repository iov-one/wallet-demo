import React from "react";
import styled from "styled-components";
import classNames from "classnames";

const Input = styled.input`
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
  &.right {
    text-align: right;
  }
  &::placeholder {
    color: #b8bccc;
  }
  &:-ms-placeholder {
    color: #b8bccc;
  }
  &::placeholder {
    color: #b8bccc;
  }
  &.hasError {
    border: solid 1px #ffa941;
    background-color: #fff1e1;
  }
`;

export const TextInput = (props: any): JSX.Element => {
  const className = classNames(props.align || "left", {
    hasError: props.hasError,
  });
  return <Input type="text" className={className} {...props} />;
};
