import React from "react";
import styled from "styled-components";

import classNames from "classnames";

const NavWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const ActiveIndicator = styled.div`
  width: 100%;
  height: 5px;
  border-radius: 2.5px;
  background-color: #31e6c9;
  opacity: 0;
  transition: opacity 0.5s;
`;

const NavItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0px 25px;
  &:first-child {
    margin-left: 0px;
  }
  &:last-child {
    margin-right: 0px;
  }
  cursor: pointer;
  &.active ${ActiveIndicator} {
    opacity: 1;
  }
  &:hover ${ActiveIndicator} {
    opacity: 1;
  }
`;

const NavText = styled.div`
  font-family: Muli;
  font-size: 14px;
  font-weight: 600;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #2d2f30;
  padding: 2px 2px;
`;

export interface NavigationProps {
  readonly items: ReadonlyArray<string>;
  readonly activeItem?: string;
}

export const Navigation = (props: NavigationProps): JSX.Element => (
  <NavWrapper>
    {props.items.map((item, key) => (
      <NavItem className={classNames({ active: item === props.activeItem })} key={`nav_item_${key}`}>
        <NavText>{item}</NavText>
        <ActiveIndicator />
      </NavItem>
    ))}
  </NavWrapper>
);
