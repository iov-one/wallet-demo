import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

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
  text-align: right;
  margin-right: 7px;
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
  return (
    <Wrapper>
      <Input type="text" {...props} />
      <Unit>{props.unit}</Unit>
    </Wrapper>
  );
};
