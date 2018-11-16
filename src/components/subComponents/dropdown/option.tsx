import React from "react";
import styled from "styled-components";

const DropdownOptionWrapper = styled.button`
  cursor: pointer;
  outline: none;
  align-items: flex-start;
  border-width: 0px;
  border-bottom: 1px solid #f3f3f3;
  margin-top: 15px;
  margin-top: 0px;
  padding: 15px;
  &:hover {
    background-color: #fcfcfc;
  }
  height: 0px;
  opacity: 0;
  transition: all 0.5s;
  &.show {
    opacity: 1;
    height: 76px;
  }
  &:last-child {
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
  }
`;

const DropdownLabel = styled.div`
  font-family: Muli;
  font-size: 16px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: 20.6px;
  letter-spacing: normal;
  text-align: left;
  color: #000000;
  margin-bottom: 5px;
`;

const DropdownDescription = styled.div`
  font-family: Muli;
  font-size: 14px;
  font-weight: 300;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: left;
  color: #6f749a;
`;

export interface DropdownItemProps {
  readonly className?: string;
  readonly value: string;
  readonly label: string;
  readonly description?: string;
  readonly onClick: (sel: string) => any;
}

export const DropdownOption = (props: DropdownItemProps): JSX.Element => {
  const { value, label, description, onClick, className } = props;
  return (
    <DropdownOptionWrapper className={className} onClick={() => onClick(value)}>
      <DropdownLabel>{label}</DropdownLabel>
      {description && <DropdownDescription>{description}</DropdownDescription>}
    </DropdownOptionWrapper>
  );
};
