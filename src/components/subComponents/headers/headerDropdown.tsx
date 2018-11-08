import React from "react";
import styled from "styled-components";

import ChevronDownIcon from "../../../../resources/chevron-down.svg";

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  cursor: pointer;
`;

const Title = styled.div`
  display: inline;
  font-family: Muli;
  font-size: 20px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #1c1c1c;
  margin-right: 12px;
`;

const Icon = styled.img`
  width: 16px;
  height: 9px;
  object-fit: contain;
`;

interface LocalProps {
  readonly title: string;
}

export const HeaderDropdown = (props: LocalProps): JSX.Element => (
  <Wrapper>
    <Title>{props.title}</Title>
    <Icon src={ChevronDownIcon} />
  </Wrapper>
);
