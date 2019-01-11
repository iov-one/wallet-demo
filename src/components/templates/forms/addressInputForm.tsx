import React from "react";
import styled from "styled-components";

import { BnsConnection } from "@iov/bns";

import { isEmpty } from "lodash";

import { FormInput, TooltipDescription } from "../../compoundComponents/form";
import { Button } from "../../subComponents/buttons";
import { Paper } from "../../subComponents/page";

import { resolveAddress } from "../../../../src/logic";

interface AddressInputProps {
  readonly connection: BnsConnection | undefined;
  readonly onNext: (address: string) => any;
}

interface AddressInputState {
  readonly address: string;
  readonly errorMessage: string;
}

const Wrapper = styled.div`
  flex-basis: 506px;
  margin-top: 48px;
`;

const ActionWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 13px;
`;

export class AddressInputForm extends React.Component<AddressInputProps, AddressInputState> {
  public readonly state = {
    address: "",
    errorMessage: "",
  };
  constructor(props: AddressInputProps) {
    super(props);
    this.state = {
      address: "",
      errorMessage: "",
    };
  }
  public readonly handleInputChange = async (evt: React.SyntheticEvent<EventTarget>): Promise<any> => {
    const { connection } = this.props;
    const target = evt.target as HTMLInputElement;
    const address = target.value;
    this.setState({
      address,
    });

    if (!connection) {
      this.setState({
        errorMessage: "BNS connection not avaialble",
      });

      return;
    }

    try {
      await resolveAddress(connection, address);
      this.setState({
        errorMessage: "",
      });
    } catch {
      this.setState({
        errorMessage: "Not a valid IOV or wallet address",
      });
    }
  };
  public readonly handleNext = (): any => {
    const { address } = this.state;
    const { onNext } = this.props;
    onNext(address);
  };

  public render(): JSX.Element {
    const { errorMessage, address } = this.state;
    return (
      <Wrapper>
        <Paper>
          <FormInput
            title="Send Payment to"
            placeholder="IOV or wallet address"
            notification={errorMessage}
            onChange={this.handleInputChange}
          />
          <ActionWrapper>
            <Button
              title="Next"
              type="primary"
              disabled={!isEmpty(errorMessage) || isEmpty(address)}
              onClick={this.handleNext}
            />
            <TooltipDescription
              label="How it works"
              info="Send payments to anyone with an IOV handle, and it will go directly to their account. If they don’t have an IOV account add their blockchain address."
            />
          </ActionWrapper>
        </Paper>
      </Wrapper>
    );
  }
}
