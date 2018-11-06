import React from "react";
import styled from "styled-components";

import classNames from "classnames";

import { Input } from "../../subComponents/input";
import { InputNotification, TextFieldLabel } from "../../subComponents/typography";

const Wrapper = styled.div``;

interface FormInputProps {
  readonly title: string;
  readonly notification?: string;
  readonly [prop: string]: any;
}

export const FormInput = (props: FormInputProps) => {
  const { title, notification } = props;
  const inputClassName = classNames({
    hasError: notification,
  });
  return (
    <Wrapper>
      <TextFieldLabel>{title}</TextFieldLabel>
      <Input className={inputClassName} {...props} />
      {notification && <InputNotification className={inputClassName}>{notification}</InputNotification>}
    </Wrapper>
  );
};
