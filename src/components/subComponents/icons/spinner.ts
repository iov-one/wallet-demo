import styled, { keyframes } from "styled-components";

const keyFrameSpin = keyframes`
    from {
        transform: rotate(0deg);
    } to {
        transform: rotate(360deg);
    }
`;

export const Spinner = styled.div`
  width: 20px;
  height: 20px;

  border: 2px solid #ffffff;
  border-top: 2px solid #b8bccc;
  border-radius: 100%;
  margin-left: 10px;
  margin-right: 10px;

  animation: ${keyFrameSpin} 0.55s infinite linear;
`;
