import { isEmpty } from "lodash";
import React from "react";
import styled from "styled-components";

import { TextInput, TextInputWithUnit } from "../../subComponents/input";
import { FieldLabel } from "../../subComponents/typography";

interface InputFieldProps {
  readonly title: string;
  readonly description?: string;
  readonly unit?: string;
  readonly notification?: string;
  readonly error?: string;
  readonly [prop: string]: any;
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
`;

const Notification = styled.div`
  font-family: Open Sans;
  font-size: 16px;
  font-weight: 600;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.63;
  letter-spacing: 0.7px;
  color: #6f749a;
  margin-top: 7px;
`;

const Error = styled.div`
  font-family: Open Sans;
  font-size: 16px;
  font-weight: 600;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.63;
  letter-spacing: 0.7px;
  color: #ffb968;
  margin-top: 7px;
`;

export const InputField = (props: InputFieldProps): JSX.Element => {
  const { title, description, notification, unit, error } = props;
  return (
    <Wrapper>
      <FieldLabel title={title} description={description} />
      {isEmpty(unit) ? (
        <TextInput hasError={error} {...props} />
      ) : (
        <TextInputWithUnit hasError={error} unit={unit} {...props} />
      )}
      {error ? (
        <Error>{notification}</Error>
      ) : (
        !isEmpty(notification) && <Notification>{notification}</Notification>
      )}
    </Wrapper>
  );
};
