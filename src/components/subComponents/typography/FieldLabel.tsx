import React from "react";
import styled from "styled-components";

interface FieldLabelProps {
  readonly title: string;
  readonly description: string;
}

const Label = styled.div`
  font-family: Open Sans;
  font-size: 16px;
  font-weight: 600;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.63;
  letter-spacing: 0.7px;
  color: #1c1c1c;
`;

const Description = styled.span`
  font-weight: 300;
  color: #6f749a;
`;

export const FieldLabel = (props: FieldLabelProps): JSX.Element => {
  const { title, description } = props;
  return (
    <Label>
      {title}
      <Description>{` (${description})`}</Description>
    </Label>
  );
};
