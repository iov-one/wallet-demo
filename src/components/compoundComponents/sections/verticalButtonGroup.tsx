import React from "react";
import styled from "styled-components";

import { Button } from "../../subComponents/buttons";

const Wrapper = styled.div`
  width: 450px;
  padding: 30px 54px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: stretch;
`;

interface ButtonType {
  readonly title: string;
  readonly type: string;
  readonly icon?: string;
  readonly disabled?: boolean;
  readonly onClick: () => any;
}

interface GroupProps {
  readonly buttons: ReadonlyArray<ButtonType>;
}

export const VerticalButtonGroup = (props: GroupProps) => (
  <Wrapper>
    {props.buttons.map(({ title, type, onClick, icon }, idx) => (
      <Button title={title} type={type} icon={icon} isVertical onClick={onClick} key={`button_${idx}`} />
    ))}
  </Wrapper>
);
