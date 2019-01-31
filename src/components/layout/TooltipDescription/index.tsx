import React from "react";
import styled from "styled-components";

import { InfoIcon } from "../../subComponents/icons";
import { Tooltip } from "../../subComponents/misc";

interface ToolTipProps {
  readonly label: string;
  readonly info: string;
  readonly reversed?: boolean;
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Label = styled.span`
  font-family: Muli;
  font-size: 14px;
  font-weight: 300;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #1c1c1c;
  margin-right: 5px;
`;

export const TooltipDescription = (props: ToolTipProps) => (
  <Wrapper>
    {props.reversed && (
      <Tooltip left info={props.info}>
        <InfoIcon />
      </Tooltip>
    )}
    <Label>{props.label}</Label>
    {!props.reversed && (
      <Tooltip info={props.info}>
        <InfoIcon />
      </Tooltip>
    )}
  </Wrapper>
);