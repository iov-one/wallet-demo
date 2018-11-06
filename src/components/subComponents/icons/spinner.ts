import styled, { keyframes } from "styled-components";

const keyFrameSpin = keyframes`
    from {
        transform: rotate(0deg);
    } to {
        transform: rotate(360deg);
    }
`;

export const Spinner = styled.div`
  box-sizing: border-box;
  width: 18px;
  height: 18px;

  border: 2px solid #ffffff;
  border-top: 2px solid rgba(184, 188, 221, 0.5);
  border-radius: 100%;
  margin-left: 10px;
  margin-right: 10px;

  animation: ${keyFrameSpin} 0.55s infinite linear;
  &.lg {
    width: 22px;
    height: 22px;
  }
`;
