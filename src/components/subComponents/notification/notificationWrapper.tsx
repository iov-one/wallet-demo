import styled from "styled-components";

export const NotificationWrapper = styled.div`
  position: relative;
  display: inline-block;
  border: 1px solid #f3f3f3;
  border-radius: 5px;
  background-color: #fff;
  box-shadow: 0 4px 16px 0 #e3e4e7;
  margin-top: 10px;
  min-height: 100px;
  min-width: 194px;
  &.secondary {
    background-color: #31e6c9;
    border: none;
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
  &.secondary::before {
    border-bottom: 10px solid #31e6c9;
    border-right: 10px solid #31e6c9;
    box-shadow: none;
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
