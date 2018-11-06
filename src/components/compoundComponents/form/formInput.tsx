import React from "react";
import styled from "styled-components";

import classNames from "classnames";

import { Input } from "../../subComponents/input";
import { InputNotification, TextFieldLabel } from "../../subComponents/typography";

const Wrapper = styled.div``;

interface FormInputProps {
  readonly title: string;
  readonly type?: string;
  readonly error?: string;
  readonly confirmation?: string;
  readonly [prop: string]: any;
}

export const FormInput = (props: FormInputProps) => {
  const { title, type, notification } = props;
  const inputClassName = classNames({
    hasError: notification && type !== "confirm",
    confirm: type === "confirm",
  });
  return (
    <Wrapper>
      <TextFieldLabel>{title}</TextFieldLabel>
      <Input className={inputClassName} {...props} disabled={props.disabled || type === "confirm"} />
      {notification && <InputNotification className={inputClassName}>{notification}</InputNotification>}
    </Wrapper>
  );
};
