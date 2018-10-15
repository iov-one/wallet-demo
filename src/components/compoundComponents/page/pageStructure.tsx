import React from "react";
import styled from "styled-components";

import { NormalHeader } from "../../subComponents/headers";

interface PageProps {
  readonly children: JSX.Element;
  readonly whiteBg?: boolean;
}

const Wrapper = styled.div`
  display: flex;
  height: 100vh;
  flex-direction: column;
`;

const PageContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 25px;
  overflow-x: scroll;
  &.whiteBg {
    background-color: transparent;
  }
  &.darkBg {
    background-color: #f9fafc;
  }
`;

export const PageStructure = (props: PageProps): JSX.Element => (
  <Wrapper>
    <NormalHeader />
    <PageContent className={props.whiteBg ? "whiteBg" : "darkBg"}>{props.children}</PageContent>
  </Wrapper>
);
