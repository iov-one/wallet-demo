import styled from "styled-components";

export const InputNotification = styled.div`
  font-family: Muli;
  font-size: 14px;
  font-weight: bold;
  font-style: normal;
  font-stretch: normal;
  line-height: 26px;
  letter-spacing: 0.7px;
  &.hasError {
    color: #ffb968;
  }
  &.confirm {
    color: #31e6c9;
  }
`;
