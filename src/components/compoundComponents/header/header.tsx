import React from "react";
import styled from "styled-components";

import { NormalHeader, HeaderDropdown, HeaderIcon, Navigation } from "../../subComponents/headers";

const HeaderContent = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-left: 230px;
`;
const RightNavigation = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const Header = () => {
  const navItems = ["Balance", "Payments"];
  return (
    <NormalHeader>
      <HeaderContent>
        <Navigation items={navItems} />
        <RightNavigation>
          <HeaderIcon icon="loading" />
          <HeaderIcon icon="bell" />
          <HeaderDropdown title="Hi!" />
        </RightNavigation>
      </HeaderContent>
    </NormalHeader>
  );
};
