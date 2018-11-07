import styled from "styled-components";

export const DropdownMenu = styled.div`
  position: absolute;
  flex-direction: column;
  left: 0px;
  top: 62px;
  min-width: 209px;
  box-shadow: 0 4px 16px 0 #e3e4e7;
  background-color: #ffffff;
  border-radius: 4px;
  display: none;
  &.show {
    display: flex;
  }
`;
