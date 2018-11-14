import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  display: inline-block;
  position: relative;
`;

const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const TooltipBox = styled.div`
  display: none;
  position: absolute;
  left: 22px;
  top: 22px;
  transition: opacity 0.5s;
  opacity: 0;
  padding: 14px 16px;
  width: 179px;
  border-radius: 5px;
  box-shadow: 0 0 4px 0 #f3f4f8;
  border: solid 0.5px #e9eaf0;
  background-color: #ffffff;
  font-family: Muli;
  font-size: 14px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.5;
  letter-spacing: normal;
  color: #81869d;
  ${Wrapper}:hover & {
    display: inline-block;
    opacity: 1;
    left: -176px;
    top: 30px;
  }
  &::before {
    content: "";
    position: absolute;
    top: -6px;
    right: 20px;
    width: 0px;
    height: 0px;
    border: 5px solid transparent;
    border-bottom: 10px solid white;
    border-right: 10px solid white;
    box-shadow: 1px 1px #f3f3f3;
    border-radius: 3px;
    transform: rotate(-135deg);
  }
`;

export const Tooltip = (props: { readonly info: any; readonly children: any }): JSX.Element => (
  <Wrapper>
    <Content>{props.children}</Content>
    <TooltipBox>{props.info}</TooltipBox>
  </Wrapper>
);
