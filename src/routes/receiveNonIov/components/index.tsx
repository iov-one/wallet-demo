import { findIndex } from "lodash";
import * as React from "react";
import styled from "styled-components";
import { ConfirmInput, TooltipDescription } from "~/components/compoundComponents/form";
import Field from "~/components/forms/Field";
import SelectField from "~/components/forms/SelectField";
import Block from "~/components/layout/Block";
import { Paper } from "~/components/subComponents/page";
import { H2 } from "~/components/subComponents/typography";
import { AddressInfo } from "../container/selector";

const Wrapper = styled.div`
  flex-basis: 506px;
  max-width: 506px;
  align-self: center;
  margin-top: 32px;
`;

const ActionWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 23px;
`;

const ModalPaper = styled(Paper)`
  flex-basis: 506px;
  padding-bottom: 40px;
`;

const MainText = styled(H2)`
  margin-bottom: 30px;
`;

const Highlight = styled.span`
  color: #31e6c9;
`;

export const TOKEN_FIELD = "token";

interface ReceiveNonIOVProps {
  readonly addressList: ReadonlyArray<AddressInfo>;
}

interface RecieveNonIOVState {
  readonly token: string;
  readonly phoneHook: HTMLDivElement | null;
}

class ReceiveIOVForm extends React.Component<ReceiveNonIOVProps, RecieveNonIOVState> {
  public readonly state = {
    token: "IOV",
    phoneHook: null,
  };

  private readonly phoneHookRef = React.createRef<HTMLDivElement>();
  public componentDidMount(): void {
    this.setState(() => ({
      phoneHook: this.phoneHookRef.current,
    }));
  }

  public readonly onChangeAddress = (token: string): void => {
    this.setState({
      token,
    });
  };

  public readonly getTokenAddress = (): string => {
    const { token } = this.state;
    const { addressList } = this.props;
    const idx = findIndex(addressList, addressInfo => addressInfo.token === token);
    return addressList[idx] ? addressList[idx].address : "--";
  };

  public readonly onUpdateBalanceToSend = (ticker: string) => {
    /*const balanceToken = this.props.balanceTokens.find(balance => balance.tokenTicker === ticker);
    this.setState(() => ({ balanceToSend: balanceToken! }));*/
    console.log(`Selected ticker: ${ticker}`);
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
          <Block margin="xl" />
          <Field
            name={TOKEN_FIELD}
            phoneHook={this.state.phoneHook}
            component={SelectField}
            align="right"
            items={tokenList}
            initial="IOV"
            onChangeCallback={this.onUpdateBalanceToSend}
            width={100}
          />
          <div ref={this.phoneHookRef} />
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

export default ReceiveIOVForm;
