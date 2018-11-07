import styled from "styled-components";

export const NotificationWrapper = styled.div`
  position: relative;
  display: inline-block;
  border-radius: 4px;
  background-color: #fff;
  box-shadow: 0 4px 16px 0 #e3e4e7;
  margin-top: 10px;
  min-height: 100px;
  min-width: 194px;
  &.secondary {
    background-color: #31e6c9;
  }
  &::before {
    content: "";
    position: absolute;
    top: -20px;
    right: 20px;
    width: 2px;
    height: 0px;
    border: 10px solid transparent;
    border-bottom: 10px solid white;
  }
  &.secondary::before {
    border-bottom: 10px solid #31e6c9;
  }
  font-family: Muli;
  font-size: 16px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: 24.4px;
  letter-spacing: normal;
  color: #ffffff;
`;
