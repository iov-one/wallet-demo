import React from "react";
import styled from "styled-components";

import Logo from "../../../../resources/iov-logo-2@3x.png";

const Header = styled.div`
  padding: 16px 50px;
  height: 71px;
  background-color: #ffffff;
  box-sizing: border-box;
  z-index: 100;
  display: flex;
  flex-direction: row;
  border-bottom: 1px solid #f3f3f3;
`;

const LogoImage = styled.img`
  width: 84px;
  height: 39px;
  object-fit: contain;
  cursor: pointer;
`;

interface NormalHeaderProps {
  readonly onLogo: () => any;
  readonly children: JSX.Element;
}

export const NormalHeader = (props: NormalHeaderProps): JSX.Element => (
  <Header>
    <LogoImage onClick={props.onLogo} src={Logo} alt="logo" />
    {props.children}
  </Header>
);
