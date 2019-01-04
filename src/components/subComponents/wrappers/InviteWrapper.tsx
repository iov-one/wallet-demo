import React from "react";
import styled from "styled-components";

import HeartIcon from "../../../../resources/heart_border.svg";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  border-radius: 5px;
  box-shadow: 0 0 6px 0 #f3f4fb;
  position: relative;
  margin-top: 50px;
  padding-top: 36px;
  padding-left: 30px;
  padding-right: 30px;
  padding-bottom: 36px;
  box-sizing: border-box;
`;

const Icon = styled.img`
  align-self: center;
`;

interface WrapperProps {
  readonly children: JSX.Element;
  readonly style?: React.CSSProperties;
}

export const InviteInfoWrapper = (props: WrapperProps): JSX.Element => (
  <Wrapper style={props.style}>
    <Icon height={100} width={100} src={HeartIcon} />
    {props.children}
  </Wrapper>
);
