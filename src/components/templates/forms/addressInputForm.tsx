import React from "react";
import styled from "styled-components";

import { isEmpty } from "lodash";

import { FormInput, TooltipDescription } from "../../compoundComponents/form";
import { Button } from "../../subComponents/buttons";
import { Paper } from "../../subComponents/page";

interface AddressInputProps {
  readonly addressError: string;
  readonly onNext: (address: string) => any;
}

interface AddressInputState {
  readonly address: string;
  readonly errorMessage: string;
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

const addrRegex = /[a-z0-9_]{4,32}\*iov/;
const checkAddressFormat = (address: string): boolean => addrRegex.exec(address) !== null;

export class AddressInputForm extends React.Component<AddressInputProps, AddressInputState> {
  public readonly state = {
    address: "",
    errorMessage: "",
  };
  constructor(props: AddressInputProps) {
    super(props);
    this.state = {
      address: "",
      errorMessage: props.addressError,
    };
  }
  public readonly handleInputChange = (evt: any): any => {
    const address = evt.target.value;
    this.setState({
      address,
    });
    if (!checkAddressFormat(address)) {
      this.setState({
        errorMessage: "Not a valid IOV or wallet address",
      });
    } else {
      this.setState({
        errorMessage: "",
      });
    }
  };
  public readonly handleNext = (): any => {
    const { address } = this.state;
    const { onNext } = this.props;
    onNext(address);
  };

  public componentWillReceiveProps(nextProps: AddressInputProps): any {
    if (nextProps.addressError !== this.props.addressError) {
      this.setState({
        errorMessage: nextProps.addressError,
      });
    }
  }

  public render(): JSX.Element {
    const { errorMessage, address } = this.state;
    return (
      <Wrapper>
        <Paper style={{ width: "506px" }}>
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
