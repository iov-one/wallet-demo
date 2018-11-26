import React from "react";
import styled from "styled-components";

import HeartIcon from "../../../../resources/heart_border.svg";

const Wrapper = styled.div`
  width: 551px;
  background-color: white;
  border-radius: 5px;
  box-shadow: 0 0 6px 0 #f3f4fb;
  position: relative;
  margin-top: 85px;
  padding-top: 80px;
  padding-left: 30px;
  padding-right: 30px;
  padding-bottom: 36px;
  box-sizing: border-box;
`;

const Icon = styled.img`
  width: 100px;
  height: 100px;
  box-sizing: border-box;
  border-radius: 50px;
  border: 2px solid white;
  position: absolute;
  left: 225.5px;
  top: -50px;
`;

interface WrapperProps {
  readonly children: JSX.Element;
}

export const InviteInfoWrapper = (props: WrapperProps): JSX.Element => (
  <Wrapper>
    <Icon src={HeartIcon} />
    {props.children}
  </Wrapper>
);
