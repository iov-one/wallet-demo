import * as React from "react";
import styled from "styled-components";
import { ConfirmInput, TooltipDescription } from "~/components/compoundComponents/form";
import Field from "~/components/forms/Field";
import Form from "~/components/forms/Form";
import SelectField, { SelectFieldItem } from "~/components/forms/SelectField";
import Block from "~/components/layout/Block";
import { Paper } from "~/components/subComponents/page";
import { H2 } from "~/components/subComponents/typography";

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
const INITIAL_TOKEN = "IOV";

interface ReceiveNonIOVProps {
  readonly addressList: ReadonlyArray<SelectFieldItem>;
}

interface RecieveNonIOVState {
  readonly ticker: SelectFieldItem;
  readonly phoneHook: HTMLDivElement | null;
}

class ReceiveIOVForm extends React.Component<ReceiveNonIOVProps, RecieveNonIOVState> {
  private readonly phoneHookRef = React.createRef<HTMLDivElement>();
  constructor(props: ReceiveNonIOVProps) {
    super(props);

    const defaultTicker = this.props.addressList.find(item => item.label === INITIAL_TOKEN);

    this.state = {
      ticker: defaultTicker ? defaultTicker : this.props.addressList[0],
      phoneHook: null,
    };
  }

  public componentDidMount(): void {
    this.setState(() => ({
      phoneHook: this.phoneHookRef.current,
    }));
  }

  public readonly onChangeAddress = (ticker: SelectFieldItem): void => {
    this.setState({
      ticker,
    });
  };

  public readonly onSubmit = async (_: object): Promise<void> => {
    return;
  };

  public render(): JSX.Element {
    const { addressList } = this.props;
    const { ticker } = this.state;

    return (
      <Wrapper>
        <Form onSubmit={this.onSubmit} fullWidth>
          {() => (
            <ModalPaper>
              <MainText>
                Receive payment from <Highlight>non-IOV users</Highlight> by giving them this address
              </MainText>
              <Block margin="xl" />
              <Field
                name={TOKEN_FIELD}
                phoneHook={this.state.phoneHook}
                component={SelectField}
                align="left"
                items={addressList}
                initial={INITIAL_TOKEN}
                variant="non-iov"
                onChangeCallback={this.onChangeAddress}
                width={100}
              />
              <Block margin="xl" />
              <div ref={this.phoneHookRef} />
              <ConfirmInput
                title={`Your ${ticker.label} Address`}
                value={ticker.value}
                notification={`${ticker.label} Address copied to clipboard`}
              />
              <ActionWrapper>
                <TooltipDescription
                  reversed
                  label="How it works"
                  info="Have a non IOV user send you Lisk to this address and it will show up on your account"
                />
              </ActionWrapper>
            </ModalPaper>
          )}
        </Form>
      </Wrapper>
    );
  }
}

export default ReceiveIOVForm;
