import React from "react";
import styled from "styled-components";

import { findIndex } from "lodash";

import { TokenTicker } from "@iov/core";

import { ConfirmInput, Dropdown, TooltipDescription } from "../../compoundComponents/form";
import { Paper } from "../../subComponents/page";
import { H2 } from "../../subComponents/typography";

interface AddressInfo {
  readonly token: TokenTicker;
  readonly address: string;
}

interface ReceiveNonIOVProps {
  readonly addressList: ReadonlyArray<AddressInfo>;
}

interface RecieveNonIOVState {
  readonly token: string;
}

const Wrapper = styled.div`
  width: 506px;
`;

const DropdownWrapper = styled.div`
  margin-bottom: 30px;
`;

const ActionWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 23px;
`;

const MainText = styled(H2)`
  margin-bottom: 30px;
`;

const ModalPaper = styled(Paper)`
  width: 506px;
  padding-bottom: 40px;
`;

const Highlight = styled.span`
  color: #31e6c9;
`;

export class ReceiveNonIOVForm extends React.Component<ReceiveNonIOVProps, RecieveNonIOVState> {
  public readonly state = {
    token: "IOV",
  };

  public readonly onChangeAddress = (token: string): void => {
    this.setState({
      token,
    });
  };

  public readonly getTokenAddress = (): string => {
    const { token } = this.state;
    const { addressList } = this.props;
    const idx = findIndex(addressList, addressInfo => addressInfo.token === token);
    return addressList[idx].address;
  };

  public render(): JSX.Element {
    const { addressList } = this.props;
    const { token } = this.state;
    const tokenList = addressList.map((addressInfo: AddressInfo) => ({
      value: addressInfo.token as string,
      label: addressInfo.token as string,
      description: addressInfo.token as string,
    }));
    const address = this.getTokenAddress();
    return (
      <Wrapper>
        <ModalPaper>
          <MainText>
            Receive payment from <Highlight>non-IOV users</Highlight> by giving them this address
          </MainText>
          <DropdownWrapper>
            <Dropdown items={tokenList} defaultValue={token} onSelect={this.onChangeAddress} />
          </DropdownWrapper>
          <ConfirmInput
            title={`Your ${token} Address`}
            value={address}
            notification={`${token} Address copied to clipboard`}
          />
          <ActionWrapper>
            <TooltipDescription
              reversed
              label="How it works"
              info="Have a non IOV user send you Lisk to this address and it will show up on your account"
            />
          </ActionWrapper>
        </ModalPaper>
      </Wrapper>
    );
  }
}
