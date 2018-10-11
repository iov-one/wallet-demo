import React from "react";
import styled from "styled-components";

import { InfoIcon } from "../icons";
import { Tooltip } from "../misc";

interface TokenProps {
  readonly tokenUnit: string;
  readonly amount: string;
  readonly info: any;
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justiy-content: center;
`;

const Text = styled.div`
  display: inline-block;
  font-family: Open Sans;
  font-size: 20px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.6;
  letter-spacing: 0.8px;
  text-align: center;
  color: #1c1c1c;
  margin-right: 8.5px;
`;

export const TokenValue = (props: TokenProps): JSX.Element => (
  <Wrapper>
    <Text>
      {props.amount} {props.tokenUnit}
    </Text>
    <Tooltip info={props.info}>
      <InfoIcon />
    </Tooltip>
  </Wrapper>
);
