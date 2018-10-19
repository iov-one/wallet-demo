import { isEmpty } from "lodash";
import React from "react";
import styled from "styled-components";

import { TextArea as AreaInput } from "../../subComponents/input";
import { FieldLabel } from "../../subComponents/typography";

interface InputFieldProps {
  readonly title?: string;
  readonly description?: string;
  readonly notification?: string;
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
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.63;
  letter-spacing: 0.7px;
  color: #6f749a;
  margin-top: 20px;
`;

export const TextArea = (props: InputFieldProps): JSX.Element => {
  const { title, description, notification } = props;
  return (
    <Wrapper>
      {title && <FieldLabel title={title} description={description} />}
      <AreaInput {...props} />
      {!isEmpty(notification) && <Notification>{notification}</Notification>}
    </Wrapper>
  );
};
