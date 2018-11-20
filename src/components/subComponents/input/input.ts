import styled from "styled-components";

export const Input = styled.input`
  height: 51px;
  width: 100%;
  box-sizing: border-box;
  border-radius: 5px;
  border: solid 1px #f3f3f3;
  font-family: Muli;
  font-size: 20px;
  font-weight: 300;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #1c1c1c;
  padding-left: 15px;
  padding-right: 15px;
  margin: 7px 0px;
  &::placeholder {
    color: #b8bccb;
  }
  &:disabled {
    background-color: #fcfcfc;
    color: #000000;
  }
  &.hasError {
    border: solid 1px #ffb968;
    background-color: #fff1e1;
  }
  &.confirm {
    background-color: #fcfcfc;
    border: 1px solid #f3f3f3;
    color: #1c1c1c;
  }
  &.confirm.checked {
    border: solid 1px #31e6c9 !important;
    background-color: #d7faf5 !important;
    color: #1c1c1c;
  }
`;
