import React from "react";
import styled from "styled-components";

import { ConfirmInput, TooltipDescription } from "../../compoundComponents/form";
import { Paper } from "../../subComponents/page";

import { resolveAddress } from "../../../../src/logic";

interface ReceiveIOVProps {
  readonly iovAddress: string;
}

const Wrapper = styled.div`
  width: 506px;
`;

const ActionWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 13px;
`;

export class ReceiveIOVForm extends React.Component<ReceiveIOVProps> {
  public render(): JSX.Element {
    const { iovAddress } = this.props;
    return (
      <Wrapper>
        <Paper style={{ width: "506px" }}>
          <ConfirmInput
            title="Your IOV Address"
            value={iovAddress}
            notification="IOV Address copied to clipboard"
          />
          <ActionWrapper>
            <TooltipDescription
              label="How it works"
              info="Receive payments from anyone with an IOV wallet. Give them your IOV username and the funds will get send directly to your wallet"
            />
          </ActionWrapper>
        </Paper>
      </Wrapper>
    );
  }
}
