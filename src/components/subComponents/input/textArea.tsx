import styled from "styled-components";

export const TextArea = styled.textarea`
  box-sizing: border-box;
  width: 100%;
  padding: 10px 12px;
  border-radius: 4px;
  border: solid 1px #e9eaf0;
  font-family: Open Sans;
  font-size: 20px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.6;
  min-height: 300px;
  letter-spacing: 0.8px;
  color: #1c1c1c;
  resize: none;
  &.right {
    text-align: right;
  }
  &::placeholder {
    color: #b8bccc;
  }
  &:-ms-placeholder {
    color: #b8bccc;
  }
  &::placeholder {
    color: #b8bccc;
  }
`;
