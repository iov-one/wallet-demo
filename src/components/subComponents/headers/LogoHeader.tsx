import React from "react";
import styled from "styled-components";

const Logo = require("../../../../resources/iov-logo-2@3x.png");

const Header = styled.div`
  padding: 16px 22px;
  height: 71px;
  box-shadow: 0 2px 4px 0 #f3f4f8;
  background-color: #ffffff;
  box-sizing: border-box;
`;

const LogoImage = styled.img`
  width: 84px;
  height: 39px;
  object-fit: contain;
`;

export const NormalHeader = (): JSX.Element => (
  <Header>
    <LogoImage src={Logo} alt="logo" />
  </Header>
);
