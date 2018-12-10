import React from "react";
import styled from "styled-components";

interface MenuItemProps {
  readonly title: string;
  readonly icon: string;
  readonly onClick: () => any;
}

const Wrapper = styled.div`
  display: flex;
  box-sizing: border-box;
  height: 50px;
  flex-direction: row;
  align-items: center;
  border-bottom: 1px solid #f3f3f3;
  &:last-child {
    border-bottom: none;
  }
  cursor: pointer;
`;

const Image = styled.img`
  width: 18px;
  height: 19px;
  object-fit: contain;
`;

const Text = styled.div`
  font-family: Muli;
  font-size: 14px;
  font-weight: 600;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #1c1c1c;
`;

export const HeaderDropdownMenuItem = (props: MenuItemProps) => (
  <Wrapper onClick={props.onClick}>
    <Image src={props.icon} />
    <Text>{props.title}</Text>
  </Wrapper>
);
