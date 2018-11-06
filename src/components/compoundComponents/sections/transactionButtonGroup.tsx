import React from "react";
import styled from "styled-components";

import { TransactionButton } from "../../subComponents/buttons";

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 450px;
`;

interface GroupProps {
  readonly onSend: () => any;
  readonly onReceive: () => any;
}

export const TransactionButtonGroup = (props: GroupProps): JSX.Element => (
  <Wrapper>
    <TransactionButton title="Send Payment" type="send" onClick={props.onSend} />
    <TransactionButton title="Receive Payment" type="receive" onClick={props.onReceive} />
  </Wrapper>
);
